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
    ids,
    type,
  }: {
    minPage?: number;
    maxPage?: number;
    ids?: number[];
    type: 'scoringAi' | 'scoringDxg';
  } = req.body;

  // 引数のバリデーション
  if (!minPage || !maxPage || !ids || !['scoringAi', 'scoringDxg'].includes(type)) {
    res.status(400).json({ error: 'minPage, maxPage, scoringAiIds, scoringDxg are required' });
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
      ids,
      type,
    });

    // 一括書き込みデータの作成
    const bulkOps = damSiteScoresList.map((score) => {
      const key = type === 'scoringAi' ? 'scoringAiId' : 'scoringDxgId';
      const keyValue = score[key];

      if (!keyValue) throw new Error('scoringAiId or scoringDxgId is not found');

      return {
        updateOne: {
          filter: {
            [key]: keyValue,
          },
          update: { $setOnInsert: score },
          upsert: true,
        },
      };
    });

    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');

    const result = await collection.bulkWrite(bulkOps);
    await client.close();
    res.status(200).json({ result });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};
