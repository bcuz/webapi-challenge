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

router.get('/:id', async (req, res) => {
  // might refactor later
  try {
    const action = await Actions.get(req.params.id);  

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'action not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the action',
    });
  }  
});

module.exports = router;
