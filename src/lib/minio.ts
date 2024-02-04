import { Client } from "minio";

const minio = new Client({
  endPoint: `${process.env.MINIO_SERVER_ENDPOINT!}`,
  port: 443,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

export default minio;
