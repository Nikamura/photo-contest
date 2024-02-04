import { error, json } from "@sveltejs/kit";
import prisma from "../../../lib/prisma";
import minio from "$lib/minio";

export async function POST({ request, locals }) {
  const user = (await locals.getSession())?.user;
  if (!user) throw error(401);

  const { fileName } = await request.json();

  const fileUpload = await prisma.fileUpload.create({
    data: {
      fileName,
      userId: user.id,
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

  const url = await minio.presignedPutObject(bucketName, bucketKey);

  const jsonResponse = {
    url,
    id: fileUpload.id,
  };
  return json(jsonResponse);
}
