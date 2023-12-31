import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from "@prisma/client";
import s3 from "./s3";

export const prismaClient = new PrismaClient({ log: ["query", "info", "warn", "error"] });

const prisma = prismaClient.$extends({
  result: {
    fileUpload: {
      width: {
        needs: { metadata: true },
        compute(fileUpload): string | null {
          return fileUpload.metadata &&
            typeof fileUpload.metadata === "object" &&
            !Array.isArray(fileUpload.metadata) &&
            fileUpload.metadata?.width
            ? String(fileUpload.metadata?.width)
            : null;
        },
      },
      height: {
        needs: { metadata: true },
        compute(fileUpload): string | null {
          return fileUpload.metadata &&
            typeof fileUpload.metadata === "object" &&
            !Array.isArray(fileUpload.metadata) &&
            fileUpload.metadata?.height
            ? String(fileUpload.metadata?.height)
            : null;
        },
      },
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
      fileUrl: {
        needs: { bucketKey: true, bucketName: true },
        async compute(fileUpload): Promise<string | null> {
          if (!fileUpload.bucketKey || !fileUpload.bucketName) {
            return null;
          }

          const getObjectCommand = new GetObjectCommand({
            Bucket: fileUpload.bucketName,
            Key: fileUpload.bucketKey,
          });

          return getSignedUrl(s3, getObjectCommand);
        },
      },
    },
  },
});

export default prisma;
