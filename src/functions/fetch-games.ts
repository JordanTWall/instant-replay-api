// src/functions/fetchgames.ts
import { connect } from './db';

export async function fetchGames(teamName: string, season: string) {
  try {
    const collectionName = teamName.replace(/\s+/g, '_');
    const db = await connect();
    const collection = db.collection(collectionName);

    console.log(`Querying collection: ${collectionName} for season: ${season}`);

    // Use the aggregation pipeline to project only the needed fields
    const result = await collection.aggregate([
      { $match: { 'parameters.season': season } },
      { $unwind: '$games' },
      {
        $project: {
          _id: 0,
          gameId: '$games.game.id',
          gameStage: '$games.game.stage',
          gameWeek: '$games.game.week',
          gameDate: '$games.game.date.date',
          homeTeamId: '$games.teams.home.id',
          homeTeamName: '$games.teams.home.name',
          homeTeamLogo: '$games.teams.home.logo',
          awayTeamId: '$games.teams.away.id',
          awayTeamName: '$games.teams.away.name',
          awayTeamLogo: '$games.teams.away.logo',
          homeTeamScore: '$games.scores.home.total',
          awayTeamScore: '$games.scores.away.total',
        },
      },
    ]).toArray();

    if (!result || result.length === 0) {
      console.log(`No games found for ${teamName} in season ${season}`);
      return [];
    }

    return result;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}
