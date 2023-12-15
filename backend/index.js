import app from './server.js';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

dotenv.config();
const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI);
const port = process.env.PORT || 8000;

async function main() {
  try {
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );

    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`server is running on port:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
