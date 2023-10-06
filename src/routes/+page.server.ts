import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const contests = prisma.contest.findMany({});
  return { contests };
}) satisfies PageServerLoad;
