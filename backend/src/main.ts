import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { postDelete, postGet, postIdsGet, postPost } from './controllers/postController';
import { damSitePost } from './controllers/damSiteController';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', postGet);
app.get('/ids', postIdsGet);
app.post('/post', postPost);
app.delete('/post/:id', postDelete);
app.post('/dam-site', damSitePost);

try {
  app.listen(appPort, () => {
    console.log(`dev server running at: http://localhost:${appPort}/`); // eslint-disable-line no-console
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message); // eslint-disable-line no-console
  }
}
