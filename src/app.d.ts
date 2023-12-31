// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

import "unplugin-icons/types/svelte";

import type { DefaultSession } from "@auth/core/types";
declare module "@auth/core/types" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}

export {};
