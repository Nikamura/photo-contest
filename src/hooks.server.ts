import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import { prismaClient } from "$lib/prisma";

const { handle, signIn, signOut } = SvelteKitAuth(async () => {
  const authOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
      Google({
        clientId: AUTH_GOOGLE_CLIENT_ID,
        clientSecret: AUTH_GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: AUTH_SECRET,
    useSecureCookies: true,
    trustHost: true,
    callbacks: {
      session: async ({ session, user }) => {
        if (session.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
  } satisfies SvelteKitAuthConfig;
  return authOptions;
});

export { handle, signIn, signOut };
