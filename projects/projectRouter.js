const express = require('express');;

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h2>hi projects!</h2>`)
});

module.exports = router;
