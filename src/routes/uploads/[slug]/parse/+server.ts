import prisma from "$lib/prisma";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "$lib/s3";
import sharp from "sharp";
import { error, json } from "@sveltejs/kit";
import exif from "exif-reader";
import iptc from "iptc-reader";
import xmp from "xmp-reader";
import icc from "icc";

export async function POST({ locals, params }) {
  const user = (await locals.getSession())?.user;
  if (!user) throw error(401);

  const id = params.slug;
  const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (fileUpload.ownerId !== user.id) throw error(401);

  const command = new GetObjectCommand({
    Bucket: fileUpload.bucketName!,
    Key: fileUpload.bucketKey!,
  });

  const resp = await s3.send(command);
  const body = await resp.Body?.transformToByteArray();
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

  const thumbnailPutObjectCommand = new PutObjectCommand({
    Bucket: fileUpload.bucketName!,
    Key: fileUpload.thumbnailBucketKey!,
    Body: thumb,
  });
  await s3.send(thumbnailPutObjectCommand);
  return json({});
}
