import { Prisma } from '@prisma/client'
import { returnUserObject } from 'src/user/return-user.object'

export const returnPaymentObject: Prisma.PaymentSelect = {
	id: true,
	createdAt: true,
	status: true,
	amount: true,
	user: {
		select: returnUserObject
	}
}
