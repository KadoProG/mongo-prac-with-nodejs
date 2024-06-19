import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app: Application = express();
const appPort = process.env.PORT || 3001;
const frontendUrl = process.env.FRONTEND_URL;

// CORSミドルウェアの設定
app.use(
  cors({
    origin: frontendUrl, // フロントエンドがホストされているオリジンを指定
    methods: ['GET', 'POST', 'DELETE'], // 許可するHTTPメソッド
    allowedHeaders: ['Content-Type'], // 許可するHTTPヘッダー
  })
);

const url = `${process.env.MONGO_URL}`;

const client = new MongoClient(url, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('mycollection');
    const documents = await collection.find({}).toArray();
    res.status(200).json(documents);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  } finally {
    await client.close();
  }
});

try {
  app.listen(appPort, () => {
    console.log(`dev server running at: http://localhost:${appPort}/`); // eslint-disable-line no-console
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message); // eslint-disable-line no-console
  }
}
