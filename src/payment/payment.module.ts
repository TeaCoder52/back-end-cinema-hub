import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
	controllers: [PaymentController],
	providers: [PaymentService, PrismaService, UserService]
})
export class PaymentModule {}
