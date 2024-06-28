class AmountPayment {
	value: string
	currency: string
}

class ObjectPayment {
	id: string
	status: string
	amount: AmountPayment
	payment_method: {
		type: string
		id: number
		saved: boolean
		title: string
		card: object
	}
	created_at: string
	expires_at: string
	description: string
}

export class PaymentStatusDto {
	event:
		| 'payment.succeeded'
		| 'payment.waiting_for_capture'
		| 'payment.canceled'
		| 'refund.succeeded'
	type: string
	object: ObjectPayment
}
