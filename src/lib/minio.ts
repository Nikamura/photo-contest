import { Client } from "minio";

const minio = new Client({
  endPoint: process.env.MINIO_SERVER_ENDPOINT!,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
  port: 443,
  useSSL: true,
});

export default minio;
