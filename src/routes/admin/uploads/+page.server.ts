import prisma from "$lib/prisma";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { PageServerLoad } from "./$types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "$lib/s3";

export const load = (async () => {
  const fileUploads = await prisma.fileUpload.findMany({});
  return {
    fileUploads: await Promise.all(
      fileUploads.map(async (fileUpload) => ({
        ...fileUpload,
        fileUrl:
          fileUpload.bucketName &&
          fileUpload.bucketKey &&
          (await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: fileUpload.bucketName,
              Key: fileUpload.bucketKey,
            }),
          )),
        thumbnailUrl:
          fileUpload.bucketName &&
          fileUpload.thumbnailBucketKey &&
          (await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: fileUpload.bucketName,
              Key: fileUpload.thumbnailBucketKey,
            }),
          )),
      })),
    ),
  };
}) satisfies PageServerLoad;
