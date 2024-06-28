import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	name: true,
	email: true,
	role: true,
	password: true,
	avatarPath: true
}
