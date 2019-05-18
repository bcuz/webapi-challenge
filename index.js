const express = require('express'); // importing a CommonJS module
const server = express();

const projectRouter = require('./projects/projectRouter.js');

server.use(express.json());

server.use('/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>hi!</h2>`)
});

server.listen(5001, () => {
  console.log('\n* Server Running on http://localhost:5001 *\n');
});
