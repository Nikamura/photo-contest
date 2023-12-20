import { error } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";
import { isAdmin } from "../../../tools/isAdmin";

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
    isAdmin: isAdmin(user),
  };
}) satisfies PageServerLoad;

export const actions = {
  saveSelectedPhotos: async (event) => {
    const user = (await event.locals.getSession())?.user;
    if (!user) throw error(401);

    const data = await event.request.formData();
    const selectedPhotos = data.getAll("selectedPhotos") as string[];

    const fileUploads = await prisma.fileUpload.findMany({
      where: {
        userId: user.id,
        id: { in: selectedPhotos },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (fileUploads.length !== selectedPhotos.length) throw error(400);
    const contest = await prisma.contest.findFirst({
      where: {
        id: event.params.slug,
      },
    });
    if (!contest) throw error(404);
    if (contest.contestStatus !== "ACCEPTING_ENTRIES") {
      throw error(400, "Contest is not accepting entries");
    }

    await prisma.contestEntry.createMany({
      data: fileUploads.map((fileUpload) => ({
        contestId: contest.id,
        userId: user.id,
        fileUploadId: fileUpload.id,
      })),
      skipDuplicates: true,
    });

    return { success: true };
  },
};
