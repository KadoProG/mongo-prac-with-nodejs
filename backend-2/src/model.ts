import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDBへの接続
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// スキーマとモデルの定義
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

export const User = mongoose.model('User', userSchema);
