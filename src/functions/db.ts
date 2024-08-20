// src/db.ts
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBConnectionString = process.env.MONGO_DB_CONNECTION_STRING as string;

const client = new MongoClient(mongoDBConnectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let connected = false;

export async function connect() {
  if (!connected) {
    await client.connect();
    connected = true;
    console.log("connected to mongodb")
  }
  return client.db('nfl_games_by_year');
}
