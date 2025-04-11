import { connect } from './db';

export async function fetchGames(teamName: string, season: string) {
  try {
    if (!teamName || !season) {
      throw new Error('Missing required parameters: teamName or season');
    }

    const collectionName = teamName.replace(/\s+/g, '_');

    const db = await connect();
    if (!db) {
      throw new Error('Failed to connect to database');
    }

    const collection = db.collection(collectionName);
    if (!collection) {
      throw new Error(`Collection "${collectionName}" not found`);
    }

    console.log(`Querying collection: ${collectionName} for season: ${season}`);

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
      console.warn(`No games found for ${teamName} in season ${season}`);
      return [];
    }

    return result;
  } catch (error: any) {
    console.error(`❌ fetchGames failed for team "${teamName}" season "${season}":`, error.message);
    return null;
  }
}
