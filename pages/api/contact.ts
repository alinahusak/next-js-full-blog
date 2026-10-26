import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

interface ContactMessage {
  email: string;
  name: string;
  message: string;
  id?: ObjectId;
}

type ResponseData = {
  message: string;
  contactMessage?: ContactMessage;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
    return;
  }

  const { email, name, message } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  ) {
    res.status(422).json({ message: "Invalid input." });
    return;
  }

  const newMessage: ContactMessage = {
    email,
    name,
    message,
  };

  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    res.status(500).json({ message: "Database is not configured." });
    return;
  }

  let client: MongoClient;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database." });
    return;
  }

  try {
    const result = await client
      .db()
      .collection("messages")
      .insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (error) {
    res.status(500).json({ message: "Storing message failed!" });
    return;
  } finally {
    await client.close();
  }

  res
    .status(201)
    .json({ message: "Successfully stored message!", contactMessage: newMessage });
}

export default handler;
