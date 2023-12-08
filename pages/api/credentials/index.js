import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { credentails } = req.body;

    const client = await MongoClient.connect(process.env.MongoURI);
    const db = client.db();
    const AccountCollection = db.collection("Account");
    const result = await AccountCollection.insertOne(credentails);
    client.close();
    res.status(201).json({ result });
  } else if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MongoURI);
    const db = client.db("Db");
    const accounts = await db.collection("Account").find({}).toArray();
    client.close();

    res.status(200).json(accounts);
  }
}
