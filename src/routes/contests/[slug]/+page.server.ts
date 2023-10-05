import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const contest = prisma.contest.findFirst({
		where: {
			id: params.slug
		}
	});
	return { contest };
}) satisfies PageServerLoad;
