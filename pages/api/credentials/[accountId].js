import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { accountId } = req.query;

    const client = await MongoClient.connect(process.env.MongoURI);
    const db = client.db();
    const collection = db.collection("Account");
    const result = await collection.deleteOne({ _id: new ObjectId(accountId) });

    client.close();

    res.status(200).json(result);
  }
}
