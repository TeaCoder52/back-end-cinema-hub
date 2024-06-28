import { Prisma } from '@prisma/client'

export const returnGenreObject: Prisma.GenreSelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true,
	description: true,
	icon: true
}
