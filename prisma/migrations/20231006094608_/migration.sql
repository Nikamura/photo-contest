-- AlterTable
ALTER TABLE "FileUpload" ALTER COLUMN "contentDisposition" DROP NOT NULL,
ALTER COLUMN "contentType" DROP NOT NULL,
ALTER COLUMN "pathname" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;