// routes/gamesinfo.js
const express = require('express')
const fetchGames = require('../functions/fetchgames')

const router = express.Router()

router.get('/games', async (req, res) => {
  try {
    const { teamName, season } = req.query
    const games = await fetchGames(teamName, season)
    res.json(games)
  } catch (error) {
    console.error('Error processing data:', error)
    res.status(500).json({ message: 'Error processing data' })
  }
})

module.exports = router
