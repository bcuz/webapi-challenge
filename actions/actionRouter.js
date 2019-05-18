const express = require('express');;

const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');

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

router.post('/', async (req, res) => {
  let { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes) {    
    return res.status(400).json({ message: "Please provide project id, description, and notes for the action." });
  }

  try {
    const project = await Projects.get(project_id);  

    if (project) {
      
      try {
        const action = await Actions.insert(req.body);
        res.status(201).json(action);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error adding the action',
        });
      }
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the project',
    });
  }  
  
});

router.put('/:id', async (req, res) => {
  if(Object.keys(req.body).length === 0){
    res.status(400).json({message: "missing data"});
  }

  try {
    const action = await Actions.update(req.params.id, req.body);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the action',
    });
  }
});

router.delete('/:id', async (req, res) => {
  // might refactor later.
  try {
    let removed = await Actions.remove(req.params.id);        
    
    if (removed) {
      res.status(200).json({ message: 'The action has been nuked' });
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the action',
    });
  }
});

module.exports = router;
