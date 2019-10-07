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

router.put('/update', (req, res) => {
  const movieUpdate = req.body;
  // console.log(movieUpdate);
  let queryText = '';
  let queryValues = [];
  if (!movieUpdate.title && !movieUpdate.description) {
    // nothing to change; don't bother sending a query
    res.sendStatus(200); // OK
    return;
  } else if (movieUpdate.title && !movieUpdate.description) {
    // only update the title
    queryText = `UPDATE "movies" SET "title" = $1 WHERE "id" = $2;`
    queryValues = [movieUpdate.title, movieUpdate.id];
  } else if (!movieUpdate.title && movieUpdate.description) {
    // only update the description
    queryText = `UPDATE "movies" SET "description" = $1 WHERE "id" = $2;`
    queryValues = [movieUpdate.description, movieUpdate.id];
  } else {
    // update both the title and description
    queryText = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE "id"=$3;`
    queryValues = [movieUpdate.title, movieUpdate.description, movieUpdate.id];
  }
  // console.log(queryText);
  // console.log(queryValues);
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT plant query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
