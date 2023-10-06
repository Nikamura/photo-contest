/*
  Warnings:

  - You are about to drop the column `contentDisposition` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `contentType` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `pathname` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `FileUpload` table. All the data in the column will be lost.
  - Added the required column `BucketKey` to the `FileUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BucketName` to the `FileUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `FileUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileUpload" DROP COLUMN "contentDisposition",
DROP COLUMN "contentType",
DROP COLUMN "name",
DROP COLUMN "pathname",
DROP COLUMN "url",
ADD COLUMN     "BucketKey" TEXT NOT NULL,
ADD COLUMN     "BucketName" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL;
