import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from "@prisma/client";
import s3 from "./s3";

export const prismaClient = new PrismaClient({ log: ["query", "info", "warn", "error"] });

const prisma = prismaClient.$extends({
  result: {
    fileUpload: {
      thumbnailUrl: {
        needs: { thumbnailBucketKey: true, bucketName: true },
        async compute(fileUpload): Promise<string | null> {
          if (!fileUpload.thumbnailBucketKey || !fileUpload.bucketName) {
            return null;
          }

          const getObjectCommand = new GetObjectCommand({
            Bucket: fileUpload.bucketName,
            Key: fileUpload.thumbnailBucketKey,
          });

          return getSignedUrl(s3, getObjectCommand);
        },
      },
    },
  },
});

export default prisma;
