/*
  Warnings:

  - You are about to drop the `Contestant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contestant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ContestItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "file" TEXT NOT NULL
);
