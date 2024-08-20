// db.js
const { MongoClient, ServerApiVersion } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config() // Load environment variables

const mongoDBConnectionString = process.env.MONGO_DB_CONNECTION_STRING

const client = new MongoClient(mongoDBConnectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect()
  }
  return client.db('nfl_games_by_year')
}

module.exports = connect
