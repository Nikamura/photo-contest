/*
  Warnings:

  - You are about to drop the column `BucketKey` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `BucketName` on the `FileUpload` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FileUpload" DROP COLUMN "BucketKey",
DROP COLUMN "BucketName",
ADD COLUMN     "bucketKey" TEXT,
ADD COLUMN     "bucketName" TEXT;
