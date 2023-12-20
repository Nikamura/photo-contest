-- CreateEnum
CREATE TYPE "ContestStatus" AS ENUM ('ACCEPTING_ENTRIES', 'VOTING', 'FINISHED');

-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "ContestStatus" "ContestStatus" NOT NULL DEFAULT 'ACCEPTING_ENTRIES';
