import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import { isAdmin } from "../tools/isAdmin";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
  const session = await locals.getSession();
  if (!session?.user) throw redirect(303, `/auth?from=${url.pathname}`);

  const contests = prisma.contest.findMany({});

  const user = session.user;
  return { contests, isAdmin: isAdmin(user) };
}) satisfies PageServerLoad;
