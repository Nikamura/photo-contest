import { put } from "@vercel/blob";
import prisma from "$lib/prisma";

export const prerender = false;

export const config = {
  runtime: "edge",
};

export const actions = {
  upload: async ({ request }) => {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const fileUploads = await prisma.$transaction(async (tx) => {
      return await Promise.all(
        files.map(async (file) => {
          const fileUpload = await tx.fileUpload.create({
            data: {
              name: file.name,
            },
          });

          const pathname = `${fileUpload.id}/${file.name}`;
          const blob = await put(pathname, file, { access: "public" });
          await tx.fileUpload.update({
            where: { id: fileUpload.id },
            data: {
              url: blob.url,
              pathname: blob.pathname,
              contentType: blob.contentType,
              contentDisposition: blob.contentDisposition,
            },
          });
          return tx.fileUpload.findFirstOrThrow({ where: { id: fileUpload.id } });
        }),
      );
    });
    return { success: true, fileUploads };
  },
};
