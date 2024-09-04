import { connect } from './db';
import util from 'util';

export async function fetchGames(teamSlug: string, season: string) {
  try {
    // Convert the teamSlug to collectionName format
    let collectionName = teamSlug
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/49Ers/i, '49ers'); // Handle special case for 49ers

    console.log(`Querying collection: ${collectionName} for season: ${season}`);

    const db = await connect();
    const collection = db.collection(collectionName);

    // Simply match the season and return the raw documents
    const result = await collection.find({ 'parameters.season': season }).toArray();

    if (!result || result.length === 0) {
      console.log(`No games found for ${collectionName} in season ${season}`);
      return [];
    }

    return result;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}
