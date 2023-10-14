import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const fileUploads = await prisma.fileUpload.findMany({
    select: {
      thumbnailUrl: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    fileUploads: await Promise.all(
      fileUploads.map(async (fileUpload) => ({
        thumbnailUrl: await fileUpload.thumbnailUrl,
      })),
    ),
  };
};
