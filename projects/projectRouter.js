const express = require('express');;

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the projects',
    });
  }
});

router.get('/:id', validateProjectId, async (req, res) => {
  res.json(req.project);  
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
  // might refactor later. id
  try {
    const actions = await Projects.getProjectActions(req.params.id);

    if (actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: 'no actions not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the project's actions",
    });
  }
});

router.post('/', async (req, res) => {
  // might refactor later
  let { name, description } = req.body;

  if (!name || !description) {    
    return res.status(400).json({ message: "Please provide name and description for the project." });
  }

  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the project',
    });
  }
});

router.put('/:id', validateProjectId, async (req, res) => {
  // validate body? length of body
  try {
    const project = await Projects.update(req.params.id, req.body);  

    res.status(200).json(project);

  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the project',
    });
  }

});

router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    
    await Projects.remove(req.params.id);    
    res.status(200).json({ message: 'The project has been nuked' });
    
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  }
});

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);

    if (project) {
      req.project = project
      next()
    } else {
      res.status(404).json({ message: 'project not found; invalid id' });
    }    
    } catch (err) {
      res.status(500).json({ message: 'failed to process request' });    
    }
};

module.exports = router;
