import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const fetchGameEvents = async (gameId: string) => {
  if (!RAPID_API_KEY) {
    throw new Error('RAPID_API_KEY is not defined in environment variables');
  }

  if (!gameId) {
    throw new Error('Missing required parameter: gameId');
  }

  const options = {
    method: 'GET',
    url: 'https://api-american-football.p.rapidapi.com/games/events',
    params: { id: gameId },
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': 'api-american-football.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error: any) {
    console.error(`❌ fetchGameEvents failed for gameId "${gameId}":`, error.message);
    throw new Error(`Failed to fetch game events: ${error.message}`);
  }
};
