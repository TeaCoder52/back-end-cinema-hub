import { PaymentStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export class PaymentDto {
	@IsOptional()
	@IsEnum(PaymentStatus)
	status: PaymentStatus

	@IsNumber()
	amount: number
}
