// src/routes/gamesinfo.ts
import express, { Request, Response } from 'express';
import { fetchGames } from '../functions/fetchgames';

const router = express.Router();

router.get('/games', async (req: Request, res: Response) => {
  try {
    const { teamName, season } = req.query as { teamName: string; season: string };
    const games = await fetchGames(teamName, season);
    res.json(games);
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ message: 'Error processing data' });
  }
});

export default router;
