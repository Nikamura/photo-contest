import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  endpoint: `https://${process.env.MINIO_SERVER_ENDPOINT!}`,
  forcePathStyle: true,
});

export default s3;
