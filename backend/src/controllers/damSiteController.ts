import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { fetchDamSiteList } from '../services/damSiteService';

const url = `${process.env.MONGO_URL}`;

const client = new MongoClient(url, {});

export const damSitePost = async (req: Request, res: Response) => {
  const {
    minPage,
    maxPage,
    scoringAiIds,
  }: { minPage?: number; maxPage?: number; scoringAiIds?: number[] } = req.body;
  if (!minPage || !maxPage || !scoringAiIds) {
    res.status(400).json({ error: 'minPage, maxPage, scoringAiIds are required' });
    return;
  }

  const minPageNumber = Number(minPage) || undefined;
  const maxPageNumber = Number(maxPage) || undefined;

  try {
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
