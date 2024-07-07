import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScoreDto } from 'src/dto/create-score.dto';
import { Score } from 'src/interfaces/score.interface';

@Injectable()
export class ScoresService {
  constructor(@InjectModel('karaoke-score') private readonly scoreModel: Model<Score>) {}

  async findAll(): Promise<Score[]> {
    return await this.scoreModel.find().exec();
  }

  async findOne(id: string): Promise<Score> {
    return await this.scoreModel.findById(id).exec();
  }

  async create(createItemDto: CreateScoreDto): Promise<Score> {
    const createdItem = new this.scoreModel(createItemDto);
    return await createdItem.save();
  }

  async update(id: string, updateItemDto: CreateScoreDto): Promise<Score> {
    return await this.scoreModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Score> {
    const doc = await this.scoreModel.findOne({ _id: id });
    await this.scoreModel.deleteOne({ _id: doc._id });
    return doc;
  }
}
