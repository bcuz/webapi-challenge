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

router.get('/:id', async (req, res) => {
  // might refactor later
  try {
    const project = await Projects.get(req.params.id);  

    if (project) {
      res.status(200).json(project);
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

module.exports = router;
