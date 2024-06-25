import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const url = `${process.env.MONGO_URL}`;

const client = new MongoClient(url, {});

export const damSitePost = async (req: Request, res: Response) => {
  const { minPage, maxPage } = req.body;

  if (!minPage || !maxPage) {
    res.status(400).json({ error: 'minPage and maxPage are required' });
    return;
  }
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');
    const documents = await collection.find({}).toArray();
    await client.close();
    res.status(200).json(documents);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};
