import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { Score } from 'src/interfaces/score.interface';
import { ScoresService } from 'src/scores/scores.service';

@Controller('scores')
export class ScoresController {
  private readonly logger = new Logger(ScoresController.name);

  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Score[]> {
    this.logger.log('Accessed protected route');
    return this.scoresService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Score> {
    return this.scoresService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createItemDto: CreateScoreDto): Promise<Score> {
    return this.scoresService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: CreateScoreDto): Promise<Score> {
    return this.scoresService.update(id, updateItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Score> {
    return this.scoresService.delete(id);
  }
}
