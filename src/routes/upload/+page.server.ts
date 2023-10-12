import prisma from "$lib/prisma";
import s3 from "$lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { Actions } from "./$types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const actions = {
  upload: async ({ request }) => {
    const formData = await request.formData();
    const ids = formData.getAll("ids") as string[];
    const fileUploads = await prisma.fileUpload.findMany({
      where: { id: { in: ids } },
    });

    const urls = await Promise.all(
      fileUploads.map(async (fileUpload) => {
        const putObjectCommand = new GetObjectCommand({
          Bucket: fileUpload.bucketName!,
          Key: fileUpload.thumbnailBucketKey ?? fileUpload.bucketKey!,
        });

        return getSignedUrl(s3, putObjectCommand);
      }),
    );
    return { urls };
  },
} satisfies Actions;
