import prisma from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const id = params.slug;
  const user = (await locals.getSession())?.user;
  if (!user) throw error(401);
  const fileUpload = await prisma.fileUpload.findFirstOrThrow({
    where: {
      id: id,
      userId: user.id,
    },
  });
  return {
    id: fileUpload.id,
    fileName: fileUpload.fileName,
    metadata: fileUpload.metadata,
    exif: fileUpload.exif,
    iptc: fileUpload.iptc,
    xmp: fileUpload.xmp,
    icc: fileUpload.icc,
    thumbnailUrl: await fileUpload.thumbnailUrl,
    fileUrl: await fileUpload.fileUrl,
  };
};
