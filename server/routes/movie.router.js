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

module.exports = router;