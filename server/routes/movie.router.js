const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT "id", "title", "poster" FROM "movies" ORDER BY "title"`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error fetching movie list', error);
      res.sendStatus(500);
    });
});

router.get('/details/:id', (req, res) => {
  const queryText = `
    SELECT * FROM "movies"
    WHERE "id" = $1;
    `;
  const queryValue = req.params.id;
  pool.query(queryText, [queryValue])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error fetching movie genres', error);
      res.sendStatus(500);
    });
})

router.get('/genres/:id', (req, res) => {
  const queryText = `
    SELECT "genres".name, "genres".id FROM "movies"
    JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
    JOIN "genres" ON "movies_genres".genre_id = "genres".id
    WHERE "movies".id = $1;
    `;
  const queryValue = req.params.id;
  pool.query(queryText, [queryValue])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error fetching movie genres', error);
      res.sendStatus(500);
    });
})

module.exports = router;
