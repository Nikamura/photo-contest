import { json } from "@sveltejs/kit";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import prisma from "$lib/prisma";

export async function POST({ request }) {
  const body = (await request.json()) as HandleUploadBody;
  const jsonResponse = await handleUpload({
    body,
    request: request,
    onBeforeGenerateToken: async (pathname: string, clientPayload) => {
      const parsedPayload = JSON.parse(clientPayload ?? "{}");

      await prisma.fileUpload.create({
        data: {
          id: parsedPayload.id,
          name: parsedPayload.fileName,
          pathname: pathname,
        },
      });

      return {
        allowedContentTypes: ["image/jpeg", "image/png"],
        maximumSizeInBytes: 15 * 1024 * 1024, // 15 MB
        tokenPayload: JSON.stringify({ id: parsedPayload.id }),
      };
    },
    onUploadCompleted: async ({ blob, tokenPayload }) => {
      console.log("blob upload completed", { blob, tokenPayload });
      try {
        const { id } = JSON.parse(tokenPayload ?? "{}");

        await prisma.fileUpload.update({
          where: { id },
          data: {
            url: blob.url,
            pathname: blob.pathname,
            contentType: blob.contentType,
            contentDisposition: blob.contentDisposition,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Could not update upload");
      }
    },
  });

  return json(jsonResponse);
}
