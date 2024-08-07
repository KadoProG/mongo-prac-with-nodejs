import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: number;
  readonly email: string;
  readonly password: string;
}
