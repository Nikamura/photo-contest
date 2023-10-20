/*
  Warnings:

  - The `metadata` column on the `FileUpload` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FileUpload" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB;
