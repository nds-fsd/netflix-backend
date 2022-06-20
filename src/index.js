const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const MovieRouter = require('./routes/MovieRoutes');
const UserRouter = require('./routes/UserRoutes');
const {authRouter, configSecurity} = require('./routes/Auth');

const cors = require('cors')
const mongo = require('./mongo')
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/', authRouter)
app.use('/movies', MovieRouter)
app.use('/user', UserRouter)


app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`) // print to console when server is running
})