import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "../../../lib/prisma";
import { isAdmin } from "../../../tools/isAdmin";

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const user = (await locals.getSession())?.user;
  if (!user) error(401);

  if (!isAdmin(user)) error(403);

  const contest = await prisma.contest.findFirst({
    where: {
      id: params.slug,
    },
  });
  if (!contest) error(404);

  await prisma.contest.delete({
    where: {
      id: params.slug,
    },
  });

  return new Response(String(`Contest ${contest.name} deleted`));
};
