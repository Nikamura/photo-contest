/*
  Warnings:

  - Added the required column `updatedAt` to the `FileUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileUpload" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "BucketKey" DROP NOT NULL,
ALTER COLUMN "BucketName" DROP NOT NULL;
