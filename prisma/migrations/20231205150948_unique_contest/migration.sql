/*
  Warnings:

  - A unique constraint covering the columns `[contestId,fileUploadId]` on the table `ContestEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContestEntry_contestId_fileUploadId_key" ON "ContestEntry"("contestId", "fileUploadId");
