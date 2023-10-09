import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load: PageServerLoad = async (event: any) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(303, "/auth");
  return {};
};
