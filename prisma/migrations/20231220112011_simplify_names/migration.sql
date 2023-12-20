/*
  Warnings:

  - You are about to drop the column `ContestStatus` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "ContestStatus",
ADD COLUMN     "contestStatus" "ContestStatus" NOT NULL DEFAULT 'ACCEPTING_ENTRIES';
