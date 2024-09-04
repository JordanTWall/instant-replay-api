import express, { Request, Response } from 'express';
import { fetchGames } from '../functions/fetch-games';
import { fetchGameEvents } from '../functions/fetch-game-events';

const router = express.Router();

router.get('/games', async (req: Request, res: Response) => {
  try {
    const { teamSlug, season } = req.query as { teamSlug: string; season: string };
    const games = await fetchGames(teamSlug, season);
    res.json(games);
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ message: 'Error processing data' });
  }
});

router.get('/events', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.query as { gameId: string };
    
    if (!gameId) {
      return res.status(400).json({ message: 'gameId parameter is required' });
    }

    const events = await fetchGameEvents(gameId);
    res.json(events);
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ message: 'Error processing data' });
  }
});

export default router;
