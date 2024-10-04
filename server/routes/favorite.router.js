const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = `SELECT "necessary_info" AS "gif" FROM "favorites";`;
  pool.query(queryText)
    .then((result) => { res.send(result.rows).status(200); })
    .catch((err) => {
      console.log('Error in GET /api/favorites', err);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post('/', (req, res) => {
  const queryText = `
    INSERT INTO "favorites" ("necessary_info")
          VALUES ($1);`;
  pool.query(queryText, [req.body.URL])
    .then((result) => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error in POST /api/favorites', err);
      res.sendStatus(500);
    });
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
