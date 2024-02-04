import prisma from "$lib/prisma";

import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const fileUploads = await prisma.fileUpload.findMany({});
  return {
    fileUploads: await Promise.all(
      fileUploads.map(async (fileUpload) => ({
        ...fileUpload,
        fileUrl:
          fileUpload.bucketName &&
          fileUpload.bucketKey &&
          `https://${process.env.MINIO_SERVER_ENDPOINT}/${fileUpload.bucketName}/${fileUpload.bucketKey}`,
        thumbnailUrl:
          fileUpload.bucketName &&
          fileUpload.thumbnailBucketKey &&
          `https://${process.env.MINIO_SERVER_ENDPOINT}/${fileUpload.bucketName}/${fileUpload.thumbnailBucketKey}`,
      })),
    ),
  };
}) satisfies PageServerLoad;
