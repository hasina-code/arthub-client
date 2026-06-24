import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let dbPromise;

if (process.env.NODE_ENV === "development") {
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  dbPromise = global._mongoClientPromise;
} else {
  
  client = new MongoClient(uri, options);
  dbPromise = client.connect();
}


export async function getDb() {
  const client = await dbPromise;
  return client.db("ArtHub"); 
}


export const db = await (await dbPromise).db("ArtHub");