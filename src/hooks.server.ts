import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import type { Handle } from "@sveltejs/kit";

import { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import prisma from "$lib/prisma";

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
    callbacks: {
      signIn: async ({ profile }) => {
        if (profile && profile.email) {
          await prisma.user.upsert({
            where: { email: profile.email },
            update: profile.name
              ? {
                  name: profile.name,
                }
              : {},
            create: {
              email: profile.email,
              name: profile.name,
            },
          });
        }
        return true;
      },
    },
  } satisfies SvelteKitAuthConfig;
  return authOptions;
}) satisfies Handle;
