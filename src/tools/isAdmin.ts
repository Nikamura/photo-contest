import type { DefaultSession } from "@auth/core/types";

export function isAdmin(user: DefaultSession["user"]): boolean {
  return user?.email === "sniuff@gmail.com";
}
