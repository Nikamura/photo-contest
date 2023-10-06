import { put } from "@vercel/blob";
import prisma from "$lib/prisma";
import type { Actions } from "./$types";

export const prerender = false;

export const config = {
  runtime: "edge",
};

export const actions = {
  upload: async ({ request }) => {
    const formData = await request.formData();
    const fileId = formData.get("id") as string;
    const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
      where: { id: fileId },
    });
    return { fileUpload };
  },
} satisfies Actions;
