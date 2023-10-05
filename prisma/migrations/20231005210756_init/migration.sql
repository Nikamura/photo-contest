-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestItem" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "ContestItem_pkey" PRIMARY KEY ("id")
);
