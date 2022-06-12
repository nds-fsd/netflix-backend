const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const projectRoutes = require('./routes/projectRoutes')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

//!--> Connection String to MongoDB user: netflix / password: netflix / db name: proj-mng <--
const dbURI =
  'mongodb+srv://netflix:netflix@cluster0.wqxvqva.mongodb.net/proj-mng?retryWrites=true&w=majority'

//* Mongoose module to connect to our database:
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log('Database is connected')
  })
  .catch((err) => console.log(err))

//! const dotenv = require('dotenv')
//! dotenv.config

//* enable cors
app.use(cors())

app.get('/', (request, response) => response.send('Hello from the other side!'))

app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`) // print to console when server is running
})

/**
 * ! Parses the text as JSON and exposes teh resulting obj on req.body
 * * bodyParser.json(options)
 * */

app.use(bodyParser.json())
app.use('projects', projectRoutes)
