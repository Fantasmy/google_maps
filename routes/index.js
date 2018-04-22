'use tricts';

const express = require('express');
const router = express.Router();

const Spot = require('../models/spot');

/* GET home page. */
router.get('/', (req, res, next) => {
  Spot.find({})
    .then((result) => {
      const data = {
        spots: result
      };
      res.render('pages/homepage', data);
    })
    .catch(next);
});

router.get('/spots/json', (req, res, next) => {
  Spot.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
