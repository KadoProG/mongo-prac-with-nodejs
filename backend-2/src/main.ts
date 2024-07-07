import express, { Request, Response } from 'express';
import { User } from './model';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ユーザー作成のエンドポイント
app.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
