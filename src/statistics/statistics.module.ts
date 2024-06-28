import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { StatisticsController } from './statistics.controller'
import { StatisticsService } from './statistics.service'

@Module({
	controllers: [StatisticsController],
	providers: [StatisticsService, PrismaService]
})
export class StatisticsModule {}
