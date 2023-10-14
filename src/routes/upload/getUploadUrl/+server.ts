import { error, json } from "@sveltejs/kit";
import prisma from "../../../lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "$lib/s3";

export async function POST({ request, locals }) {
  const user = (await locals.getSession())?.user;
  if (!user) throw error(401);

  const { fileName } = await request.json();

  const fileUpload = await prisma.fileUpload.create({
    data: {
      fileName,
      ownerId: user.id,
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

  const url = await getSignedUrl(s3, putObjectCommand);

  const jsonResponse = {
    url,
    id: fileUpload.id,
  };
  return json(jsonResponse);
}
