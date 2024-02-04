import { PrismaClient } from "@prisma/client";

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
          return `https://${process.env.MINIO_SERVER_ENDPOINT}/${fileUpload.bucketName}/${fileUpload.thumbnailBucketKey}`;
        },
      },
      fileUrl: {
        needs: { bucketKey: true, bucketName: true },
        async compute(fileUpload): Promise<string | null> {
          if (!fileUpload.bucketKey || !fileUpload.bucketName) {
            return null;
          }
          return `https://${process.env.MINIO_SERVER_ENDPOINT}/${fileUpload.bucketName}/${fileUpload.bucketKey}`;
        },
      },
    },
  },
});

export default prisma;
