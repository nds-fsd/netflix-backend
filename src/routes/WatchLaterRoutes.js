const express = require('express')
const { User } = require('../mongo/schemas/user')
const Watch = require('../mongo/schemas/watchLater')
const {
  isAdmin,
  isAuthorized,
  isUserOnTheDatabase,
} = require('../helpers/isAdmin')
const WatchLaterRouter = express.Router()
const { default: mongoose } = require('mongoose')

// Add a movie to watchlater of a user
WatchLaterRouter.post(
  '/:id/watchlater',
  isAuthorized,
  async (request, response) => {
    const id = request.params.id
    const movieId = request.body.id
    try {
      const movieInList = await Watch.findOne({ user: id, movie: movieId })
      if (movieInList) {
        //TODO check what returns when findOne() doesn't find anything
        return response
          .status(400)
          .json({ message: 'Movie already in the list of watch later' })
      }
      const newWatchLater = new Watch({ user: id, movie: movieId })
      await newWatchLater.save()
      response.status(201).json(newWatchLater)
    } catch (error) {
      console.log(error)
      response.status(500).json(error)
    }
  }
)

// Get all watchlater
WatchLaterRouter.get(
  '/:id/watchlater',
  isAuthorized,
  async (request, response) => {
    const id = request.params.id
    try {
      const movieListed = await Watch.find({ user: id }).populate([
        'user',
        'movie',
      ])
      if (movieListed) {
        response.status(200).json(movieListed)
      }
    } catch (error) {
      response.status(500).json(error)
    }
  }
)

// Delete watchlater movie from the list
WatchLaterRouter.delete(
  '/:id/watchlater/:movieId',
  isAuthorized,
  async (request, response) => {
    try {
      const result = await Watch.findByIdAndRemove(request.params.movieId)
      console.log(result)
      console.log(request.params.movieId)
      if (!result)
        return response.status(500).json({ message: 'Movie not found' })
      else return response.status(200).json({ message: result })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
)

module.exports = WatchLaterRouter
