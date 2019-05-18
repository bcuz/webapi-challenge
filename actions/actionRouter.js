const express = require('express');;

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h2>hi actions!</h2>`)
});

module.exports = router;
