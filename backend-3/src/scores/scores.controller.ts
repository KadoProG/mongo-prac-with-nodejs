import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { Score } from 'src/interfaces/score.interface';
import { ScoresService } from 'src/scores/scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  findAll(): Promise<Score[]> {
    return this.scoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Score> {
    return this.scoresService.findOne(id);
  }

  @Post()
  create(@Body() createItemDto: CreateScoreDto): Promise<Score> {
    return this.scoresService.create(createItemDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: CreateScoreDto): Promise<Score> {
    return this.scoresService.update(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Score> {
    return this.scoresService.delete(id);
  }
}
