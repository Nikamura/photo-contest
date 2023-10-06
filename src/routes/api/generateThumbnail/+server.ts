import prisma from "$lib/prisma";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "$lib/s3";
import sharp from "sharp";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const { id } = await request.json();
  const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const command = new GetObjectCommand({
    Bucket: fileUpload.bucketName!,
    Key: fileUpload.bucketKey!,
  });

  const resp = await s3.send(command);
  const body = await resp.Body?.transformToByteArray();

  const thumb = await sharp(body)
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
