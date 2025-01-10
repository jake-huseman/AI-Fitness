import { getSession } from "@auth0/nextjs-auth0";
import db from "../../utils/db";

export default async function handler(req, res) {
  try {
    const session = getSession(req, res);

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { user } = session;
    const database = await db;
    const userProfile = await database.collection("users").findOne({ email: user.email });

    if (!userProfile) {
      await database.collection("users").insertOne({ email: user.email, name: user.name || "Anonymous" });
      return res.status(201).json({ message: "Profile created" });
    }

    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: error.message });
  }
}