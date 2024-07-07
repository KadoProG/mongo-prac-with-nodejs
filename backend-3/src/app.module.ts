import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [ConfigModule.forRoot(), ScoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
