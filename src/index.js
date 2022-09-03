const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const MovieRouter = require('./routes/MovieRoutes')
const UserRouter = require('./routes/UserRoutes')
const { authRouter, jwtMW } = require('./routes/Auth')
const CategoryRouter = require('./routes/CategoryRoutes')
// const {verifyToken} = require('./helpers/verifyToken')

const cors = require('cors')
const { connectDB } = require('./mongo')
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
jwtMW(app)
app.use('/', authRouter)
app.use('/movies', MovieRouter)
app.use('/user', UserRouter)
app.use('/category', CategoryRouter)

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(async (error) => {
    if (error) {
      console.log(error)
    }
  })
}

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server is listening on port: http://localhost:${PORT}`)
  } // print to console when server is running
})

module.exports = { app, server }
