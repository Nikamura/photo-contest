import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import { prismaClient } from "$lib/prisma";
import type { Handle } from "@sveltejs/kit";

const { handle: handlerFunc, signIn, signOut } = SvelteKitAuth(async () => {
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

// Fix from https://github.com/nextauthjs/next-auth/issues/6451#issuecomment-1399793425
// So it works via reverse proxy :/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handle: Handle = ({ event, resolve }: any) => {
  // event.url.protocol = "http:";

  // const symbol = Object.getOwnPropertySymbols(event.request)[1];

  // event.request[symbol].url.protocol = "http:";
  // for (let i = 0; i < event.request[symbol].urlList.length; i++) {
  //   event.request[symbol].urlList[i].protocol = "http:";
  // }

  return handlerFunc({ event, resolve });
};

export { handle, signIn, signOut };
