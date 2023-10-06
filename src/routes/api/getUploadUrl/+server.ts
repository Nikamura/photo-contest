import { json } from "@sveltejs/kit";
import minio from "$lib/minio";
import prisma from "../../../lib/prisma";

export async function POST({ request }) {
  const { fileName } = await request.json();
  const fileUpload = await prisma.fileUpload.create({
    data: {
      fileName,
    },
  });

  const bucketName = "photo-contest";
  const bucketKey = `${fileUpload.createdAt.toISOString()}-${fileUpload.id}/${fileUpload.fileName}`;

  await prisma.fileUpload.update({
    where: {
      id: fileUpload.id,
    },
    data: {
      bucketName,
      bucketKey,
    },
  });

  const presignedUrl = await minio.presignedPutObject(bucketName, bucketKey);
  const jsonResponse = {
    url: presignedUrl,
    id: fileUpload.id,
  };
  return json(jsonResponse);
}
