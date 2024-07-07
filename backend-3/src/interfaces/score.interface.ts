import { Document } from 'mongoose';

export interface Score extends Document {
  readonly score: number;
}
