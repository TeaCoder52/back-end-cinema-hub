import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'

@Module({
	controllers: [MovieController],
	providers: [MovieService, PrismaService]
})
export class MovieModule {}
