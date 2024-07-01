import { Request, Response } from 'express';
import { MongoClient, ObjectId, Sort } from 'mongodb';

const url = `${process.env.MONGO_URL}`;

const client = new MongoClient(url, {});

export const postGet = async (req: Request, res: Response) => {
  const { page, perPage } = req.query;

  const pageNumber = Number(page) || 1;
  const perPageNumber = Number(perPage) || undefined;
  const skip = perPageNumber ? (pageNumber - 1) * perPageNumber : undefined;

  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');

    const filterQuery = {};

    const sortQuery = { scoringDateTime: 1 } as Sort; // 昇順の場合は1、降順の場合は-1

    const findCursor = collection.find(filterQuery).sort(sortQuery);

    const findCursorWithSkip = skip ? findCursor.skip(skip) : findCursor;
    const findCursorWithLimit = perPageNumber
      ? findCursorWithSkip.limit(perPageNumber)
      : findCursorWithSkip;

    const documents = await findCursorWithLimit.toArray(); // データを取得
    const total = await collection.countDocuments(filterQuery); // 個数を取得
    res.status(200).json({
      list: documents,
      meta: {
        currentPage: pageNumber,
        perPage: perPageNumber,
        total,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  } finally {
    await client.close();
  }
};

export const postPost = async (req: Request, res: Response) => {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');
    const result = await collection.insertOne({ name: 'Hello', age: 12 });
    res.status(200).json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  } finally {
    await client.close();
  }
};

export const postDelete = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!req.params.id) throw new Error('id is required');

    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    // const result = await collection.findOneAndDelete({ _id: new ObjectId(id) });

    res.status(200).json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  } finally {
    await client.close();
  }
};
