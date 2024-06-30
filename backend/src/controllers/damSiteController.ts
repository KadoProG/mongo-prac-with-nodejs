import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { fetchDamSiteList } from '../services/damSiteService';

const url = `${process.env.MONGO_URL}`;

const client = new MongoClient(url, {});

/**
 * dam-siteのスコアを取得し、DBに保存する関数
 * @param req Request POSTリクエスト
 */
export const damSitePost = async (req: Request, res: Response) => {
  const {
    minPage,
    maxPage,
    scoringAiIds,
  }: { minPage?: number; maxPage?: number; scoringAiIds?: number[] } = req.body;

  // 引数のバリデーション
  if (!minPage || !maxPage || !scoringAiIds) {
    res.status(400).json({ error: 'minPage, maxPage, scoringAiIds are required' });
    return;
  }

  const minPageNum = Number(minPage);
  const minPageNumber = minPageNum > 0 ? minPageNum : 1;
  const maxPageNum = Number(maxPage);
  const maxPageNumber = maxPageNum <= 40 ? maxPageNum : 40;

  if (minPageNumber > maxPageNumber) {
    res.status(400).json({ error: 'minPage must be less than or equal to maxPage' });
    return;
  }

  try {
    // dam-siteのスコアを取得
    const damSiteScoresList = await fetchDamSiteList({
      minPage: minPageNumber,
      maxPage: maxPageNumber,
      scoringAiIds,
    });

    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');

    const bulkOps = damSiteScoresList.map((data) => ({
      updateOne: {
        filter: { scoringAiId: data.scoringAiId },
        update: { $setOnInsert: data },
        upsert: true,
      },
    }));

    const result = await collection.bulkWrite(bulkOps);
    await client.close();
    res.status(200).json({ result });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};
