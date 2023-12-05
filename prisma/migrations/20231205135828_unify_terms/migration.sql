/*
  Warnings:

  - You are about to drop the column `photoId` on the `ContestEntry` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `FileUpload` table. All the data in the column will be lost.
  - Added the required column `fileUploadId` to the `ContestEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContestEntry" DROP CONSTRAINT "ContestEntry_photoId_fkey";

-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_ownerId_fkey";

-- AlterTable
ALTER TABLE "ContestEntry" DROP COLUMN "photoId",
ADD COLUMN     "fileUploadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FileUpload" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "ContestEntry" ADD CONSTRAINT "ContestEntry_fileUploadId_fkey" FOREIGN KEY ("fileUploadId") REFERENCES "FileUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
