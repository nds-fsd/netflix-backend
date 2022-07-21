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
      const user = await User.findById(id)
      if (!user) return response.status(404).json({ message: 'No user found' })
      if (user.watchlater.includes(movieId)) {
        return response
          .status(400)
          .json({ message: 'Movie already in the list of watch later' })
      }
      user.watchlater.push(movieId)
      await user.save()
      response.status(201).json(user)
    } catch (error) {
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
      const user = await User.findById(id)
      if (!user) return response.status(404).json({ message: 'No user found' })
      response.status(200).json(user.watchlater)
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
    const movieId = request.params.movieId
    const user = await User.findById(request.params.id)
    try {
      const index = user.watchlater.indexOf(movieId)
      if (index === -1)
        return response.status(404).json({ message: 'No movie found' })
      user.watchlater.splice(index, 1)
      await user.save()
      return response.status(204).json({ message: 'Movie deleted' })
    } catch (err) {
      return response.status(500).json({ message: err.message })
    }
  }
)

module.exports = WatchLaterRouter
