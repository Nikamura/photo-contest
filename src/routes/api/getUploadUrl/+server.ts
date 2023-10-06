import { json } from "@sveltejs/kit";
import prisma from "../../../lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "$lib/s3";

export async function POST({ request }) {
  const { fileName } = await request.json();
  const fileUpload = await prisma.fileUpload.create({
    data: {
      fileName,
    },
  });

  const bucketName = "photo-contest";
  const bucketKey = `${fileUpload.createdAt.toISOString()}-${fileUpload.id}/${fileUpload.fileName}`;
  const thumbnailBucketKey = `${fileUpload.createdAt.toISOString()}-${fileUpload.id}/thumb-${
    fileUpload.fileName
  }`;

  await prisma.fileUpload.update({
    where: {
      id: fileUpload.id,
    },
    data: {
      bucketName,
      bucketKey,
      thumbnailBucketKey,
    },
  });

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: bucketKey,
  });

  const thumbnailPutObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: thumbnailBucketKey,
  });

  const url = await getSignedUrl(s3, putObjectCommand);
  const thumbnailUrl = await getSignedUrl(s3, thumbnailPutObjectCommand);
  const jsonResponse = {
    url,
    thumbnailUrl,
    id: fileUpload.id,
  };
  return json(jsonResponse);
}
