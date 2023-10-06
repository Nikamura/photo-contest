import prisma from "$lib/prisma";
import minio from "$lib/minio";
import type { Actions } from "./$types";

export const prerender = false;

export const config = {
  runtime: "edge",
};

export const actions = {
  upload: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
      where: { id: id },
    });
    const url = await minio.presignedGetObject(fileUpload.bucketName!, fileUpload.bucketKey!);
    return { url };
  },
} satisfies Actions;
