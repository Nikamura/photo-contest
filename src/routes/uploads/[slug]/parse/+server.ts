import prisma from "$lib/prisma";
import minio from "$lib/minio";
import sharp from "sharp";
import { error, json } from "@sveltejs/kit";
import exif from "exif-reader";
// @ts-ignore
import iptc from "iptc-reader";
// @ts-ignore
import xmp from "xmp-reader";
import icc from "icc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function streamToBuffer(readableStream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readableStream.on("data", (data: any) => {
      if (typeof data === "string") {
        // Convert string to Buffer assuming UTF-8 encoding
        chunks.push(Buffer.from(data, "utf-8"));
      } else if (data instanceof Buffer) {
        chunks.push(data);
      } else {
        // Convert other data types to JSON and then to a Buffer
        const jsonData = JSON.stringify(data);
        chunks.push(Buffer.from(jsonData, "utf-8"));
      }
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export async function POST({ locals, params }) {
  const user = (await locals.getSession())?.user;
  if (!user) error(401);

  const id = params.slug;
  const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (fileUpload.userId !== user.id) error(401);

  const resp = await minio.getObject(fileUpload.bucketName!, fileUpload.bucketKey!);
  const body = await streamToBuffer(resp);
  const input = sharp(body);
  const metadata = await input.metadata();

  const { exif: exifRaw, iptc: iptcRaw, xmp: xmpRaw, icc: iccRaw, ...metadataRaw } = metadata;

  function replacer(_key: string, value: unknown) {
    if (value && typeof value === "object" && "type" in value && value.type === "Buffer") {
      return undefined;
    }
    if (value instanceof Buffer) {
      return undefined;
    }
    return value;
  }

  await prisma.fileUpload.update({
    where: {
      id: fileUpload.id,
    },
    data: {
      metadata: JSON.parse(JSON.stringify(metadataRaw, replacer).replace(/\\u0000/g, "")),
      exif: exifRaw
        ? JSON.parse(JSON.stringify(exif(exifRaw), replacer).replace(/\\u0000/g, ""))
        : {},
      iptc: iptcRaw
        ? JSON.parse(JSON.stringify(iptc(iptcRaw), replacer).replace(/\\u0000/g, ""))
        : {},
      xmp: xmpRaw
        ? JSON.parse(JSON.stringify(xmp.fromBuffer(xmpRaw), replacer).replace(/\\u0000/g, ""))
        : {},
      icc: iccRaw
        ? JSON.parse(JSON.stringify(icc.parse(iccRaw), replacer).replace(/\\u0000/g, ""))
        : {},
    },
  });
  const thumb = await input
    .resize({ fit: sharp.fit.inside, height: 400, width: 400 })
    .rotate()
    .toBuffer();

  await minio.putObject(fileUpload.bucketName!, fileUpload.thumbnailBucketKey!, thumb);
  return json({});
}
