import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const from = event.url.searchParams.get("from");
  const session = await event.locals.getSession();
  if (session?.user && from) redirect(303, from);
  return {};
};
