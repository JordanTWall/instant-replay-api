// src/functions/fetchgames.ts
import { connect } from './db';

export async function fetchGames(teamName: string, season: string) {
  try {
    const collectionName = teamName.replace(/\s+/g, '_');
    const db = await connect();
    const collection = db.collection(collectionName);

    const games = await collection.find({ season }).toArray();
    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}
