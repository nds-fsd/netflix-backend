const express = require('express');
const app = express();
const MovieRouter = require('./routes/MovieRoutes');
const cors = require('cors')
const mongo = require('./mongo')
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use('/movies', MovieRouter)


app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`) // print to console when server is running
})