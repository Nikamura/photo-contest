import { error } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  const user = (await locals.getSession())?.user;
  if (!user) throw error(401);

  const contest = await prisma.contest.findFirst({
    where: {
      id: params.slug,
    },
  });
  if (!contest) throw error(404);

  const fileUploads = await prisma.fileUpload.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userEntries = await prisma.contestEntry.findMany({
    where: {
      contestId: contest.id,
      userId: user.id,
    },
  });

  return {
    fileUploads: await Promise.all(
      fileUploads.map(async (fileUpload) => ({
        thumbnailUrl: await fileUpload.thumbnailUrl,
        fileName: fileUpload.fileName,
        id: fileUpload.id,
        metadata: fileUpload.metadata,
        exif: fileUpload.exif,
      })),
    ),
    contest,
    selectedPhotos: userEntries.map((entry) => entry.fileUploadId),
  };
}) satisfies PageServerLoad;
