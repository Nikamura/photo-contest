-- CreateTable
CREATE TABLE "FileUpload" (
    "id" TEXT NOT NULL,
    "contentDisposition" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pathname" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id")
);
