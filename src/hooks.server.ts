import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import type { Handle } from "@sveltejs/kit";

import { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth(async () => {
  const authOptions = {
    providers: [
      Google({
        clientId: AUTH_GOOGLE_CLIENT_ID,
        clientSecret: AUTH_GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: AUTH_SECRET,
    trustHost: true,
  } satisfies SvelteKitAuthConfig;
  return authOptions;
}) satisfies Handle;
