import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

let client;
let db;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  db = global._mongoClientPromise.then((client) => client.db());
} else {
  client = new MongoClient(uri);
  db = client.connect().then((client) => client.db());
}

export default db;