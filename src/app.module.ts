import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GenreModule } from './genre/genre.module';
import { ActorModule } from './actor/actor.module';
import { ReviewModule } from './review/review.module';
import { MovieModule } from './movie/movie.module';
import { FileModule } from './file/file.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaymentModule } from './payment/payment.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, GenreModule, ActorModule, ReviewModule, MovieModule, FileModule, StatisticsModule, PaymentModule]
})
export class AppModule {}
