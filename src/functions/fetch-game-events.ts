import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const fetchGameEvents = async (gameId: string) => {
  console.log(`Querying id: ${gameId}`);
  const options = {
    method: 'GET',
    url: 'https://api-american-football.p.rapidapi.com/games/events',
    params: { id: gameId }, // Ensure 'id' is correctly named
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': 'api-american-football.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data; // Return the data to be sent to the frontend
  } catch (error) {
    console.error('Error fetching game events:', error);
    throw new Error('Failed to fetch game events');
  }
};
