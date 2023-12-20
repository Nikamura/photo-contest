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
    include: {
      contestEntry: {
        include: {
          fileUpload: true,
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  if (!contest) throw error(404);

  return {
    entries: await Promise.all(
      contest.contestEntry.map(async (entry, index) => ({
        id: entry.fileUpload.id,
        index,
        fileName: `${entry.fileUpload.id}-${entry.fileUpload.fileName}`,
        fileUrl: await entry.fileUpload.fileUrl,
        thumbnailUrl: await entry.fileUpload.thumbnailUrl,
        width: entry.fileUpload.width,
        height: entry.fileUpload.height,
      })),
    ),
  };
}) satisfies PageServerLoad;
