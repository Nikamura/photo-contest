import prisma from "$lib/prisma";
import { isAdmin } from "../tools/isAdmin";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  const contests = prisma.contest.findMany({});

  const user = (await locals.getSession())?.user;
  return { contests, isAdmin: isAdmin(user) };
}) satisfies PageServerLoad;
