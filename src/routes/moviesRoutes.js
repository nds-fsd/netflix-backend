const express = require('express')
const movieModel = require('../models/prjSchemaMovies')
const app = express()

//· Get all / !
app.get('/', async (request, response) => {
  const movies = await movieModel.find({})

  try {
    response.send(movies)
  } catch (error) {
    response.status(500).send(error)
  }
})

//· Get by /:id!
app.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const movie = await movieModel.findOne({
      _id: id,
    })

    if (!movie) {
      const error = new Error("Movie doesn't exist")
      return next(error)
    }

    response.json(movie)
  } catch (error) {
    next(error)
  }
})

//· POST!
//! movie, without "S"!
app.post('/', async (request, response) => {
  const movie = new movieModel(request.body)

  try {
    await movie.save()
    response.send(movie)
  } catch (error) {
    response.status(500).send(error)
  }
})

//· PATCH!
app.patch('/:id', async (request, response) => {
  try {
    await movieModel.findByIdAndUpdate(request.params.id, request.body)
    await movieModel.save()
    response.send(movie)
  } catch (error) {
    response.status(500).send(error)
  }
})

//· DELETE!
app.delete('/:id', async (request, response) => {
  try {
    const movie = await movieModel.findByIdAndDelete(request.params.id)

    if (!movie) response.status(404).send('No item found')
    response.status(200).send()
  } catch (error) {
    response.status(500).send(error)
  }
})

module.exports = app
