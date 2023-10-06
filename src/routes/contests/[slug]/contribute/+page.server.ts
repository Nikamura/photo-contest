import prisma from "$lib/prisma";
import s3 from "$lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { Actions } from "./$types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

    const putObjectCommand = new GetObjectCommand({
      Bucket: fileUpload.bucketName!,
      Key: fileUpload.bucketKey!,
    });

    const url = await getSignedUrl(s3, putObjectCommand);
    return { url };
  },
} satisfies Actions;
