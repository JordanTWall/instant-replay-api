// fetchgames.js
const connect = require('./db')

async function fetchGames(teamName, season) {
  try {
    const db = await connect()
    const collection = db.collection(teamName)
    const games = await collection.find({ season: season }).toArray()
    return games
  } catch (error) {
    console.error('Error fetching games:', error)
    throw error
  }
}

module.exports = fetchGames
