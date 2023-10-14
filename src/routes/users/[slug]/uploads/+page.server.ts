import prisma from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const id = params.slug;
  const user = (await locals.getSession())?.user;
  if (user?.id !== id) throw error(401);
  const fileUploads = await prisma.fileUpload.findMany({
    where: {
      ownerId: id,
    },
    select: {
      thumbnailUrl: true,
      fileName: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    fileUploads: await Promise.all(
      fileUploads.map(async (fileUpload) => ({
        thumbnailUrl: await fileUpload.thumbnailUrl,
        fileName: fileUpload.fileName,
      })),
    ),
  };
};
