const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/moviesRoutes.js')
const cors = require('cors')

const app = express()
app.use(express.json())

//!--> Connection String to MongoDB user: netflix1 / password: netflix1 / replace host by localhost and port by 27017/ db name: prj3 <--
const dbURI =
  'mongodb://netflix1:netflix1@localhost:27017/prj3?authSource=admin'

//* Mongoose module to connect to our database:
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log('Database is connected')
  })
  .catch((error) => console.log(error))

app.use(projectRoutes)
app.use(cors())

app.get('/', (req, res) => res.send('Hello from homepage.'))

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`) // print to console when server is running
})
