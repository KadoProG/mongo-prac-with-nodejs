import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from 'src/scores/schemas/score.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'karaoke-score', schema: ScoreSchema }])],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
