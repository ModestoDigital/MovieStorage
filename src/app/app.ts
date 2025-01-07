import express from 'express';
import { MovieService } from './movieService';
const morgan = require('morgan');

const app = express();
const port = 3000;

const movieService = new MovieService();

async function initializeApp() {
  const csvFilePath = './src/data/Movielist.csv'; 
  await movieService.loadMoviesData(csvFilePath);
  console.log('Movies data loaded into SQLite database.');
}

async function startServer() {
  app.use(morgan('combined'));

  app.get('/producers-awards', async (req, res) => {
    try {
      const result = await movieService.getProducersAwards();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/health', async (req, res) => {
    res.status(200).send(`It's alive, it's alive`);
  });

  return new Promise((resolve, reject) => {
    const server = app.listen(port, (err?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(server);
      }
    });
  });
}

initializeApp().then(()=>{
  startServer()
    .then((server) => {
      console.log(`Server running at http://localhost:${port}`);
    })
    .catch((error) => {
      console.error('Error initializing the app:', error);
    });
}) 

export { app, initializeApp };
