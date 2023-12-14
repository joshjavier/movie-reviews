import app from './server.js';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';

dotenv.config();
const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI);
const port = process.env.PORT || 8000;

async function main() {
  try {
    await MoviesDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`server is running on port:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
