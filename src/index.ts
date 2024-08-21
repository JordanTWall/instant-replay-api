// src/index.ts
import express from 'express';
import path from 'path';
import cors from 'cors';
import gamesInfoRoutes from './routes/games-info';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/instantreplay/api', gamesInfoRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
