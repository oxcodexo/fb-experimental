import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { _id, link } = req.body.VideoLink;
    const client = await MongoClient.connect(process.env.MongoURI);
    const db = client.db();
    const AccountCollection = db.collection("VideoLink");
    const result = await AccountCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { link } }
    );
    client.close();
    res.status(201).json(result);
  } else if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MongoURI);
    const db = client.db("Db");
    const VideoLink = await db.collection("VideoLink").find({}).toArray();

    client.close();

    res.status(200).json(VideoLink[0]);
  }
}
