const express = require('express');;

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the actions',
    });
  }
});

module.exports = router;
