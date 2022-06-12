const express = require("express");
const app = express();
const mongo = require('./mongo')
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = 3001;


const projectRoutes = require('./routes/projectRoutes')
const bodyParser = require('body-parser')


app.get('/', (request, response) => response.send('Hello from the other side!'))
app.use(bodyParser.json())
app.use('projects', projectRoutes)
app.use(express.json());

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
); 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // print to console when server is running
});

