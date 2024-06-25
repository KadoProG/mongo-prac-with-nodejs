import { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const url = `${process.env.MONGO_URL}`;

const client = new MongoClient(url, {});

export const postGet = async (req: Request, res: Response) => {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection('karaokeScores');
    const documents = await collection.find({}).toArray();
    res.status(200).json(documents);
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
