const express = require('express');
const { User } = require('../mongo/schemas/user');
const verifyToken = require('../helpers/verifyToken');
const { isAdmin, isAuthorized, isUserOnTheDatabase } = require('../helpers/isAdmin');


const UserRouter = express.Router();

// GET all users
UserRouter.get('/', async (request, response) => {
    const users = await User.find({})
    try {
        response.send(users)
    } catch (error) {
        response.status(500).json(error)
    }
})

// - GET ONE USER
UserRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const user = await User.findById(id);
        if (!user) return response.status(404).json({ message: 'No user found' })
        if (request.auth.id !== request.params.id && request.auth.role !== 'ADMIN') {
            return response.status(403).json({ message: 'Not authorized' })
        } else {
            return response.status(200).json(user)
        }
    } catch (error) {
        response.status(500).json(error)
    }
})
// - POST ONE USER
UserRouter.post('/', isAdmin, async (request, response) => {
    const body = request.body;
    const data = {
        name: body.name,
        email: body.email,
        password: body.password,
    }
    const newUser = new User(data)
    await newUser.save()
    response.status(201).json(newUser)
});

// - DELETE ONE USER
UserRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const user = await User.findById(id)
        if (!user) response.status(404).json({ message: 'No user found' })
        if (request.auth.id !== request.params.id && request.auth.role !== 'ADMIN') {
            return response.status(403).json({ message: 'Not authorized' })
        } else {
            await User.findByIdAndDelete(request.params.id);
            return response.status(204).json("User deleted")
        }
    }
    catch (err) {
        return response.status(500).json({ message: err.message })
    }
})

// - DELETE FAV MOVIE
UserRouter.delete('/:id/favs/:movieId', isAuthorized, async (request, response) => {
    const movieId = request.params.movieId
    const user = await User.findById(request.params.id)

    try {
        const index = user.favs.indexOf(movieId)
        if (index === -1) return response.status(404).json({ message: 'No movie found' })
        user.favs.splice(index, 1)
        await user.save()
        return response.status(204).json({ message: 'Movie deleted' })
    } catch (err) {
        return response.status(500).json({ message: err.message })
    }
})

// - PATCH ONE USER
UserRouter.patch('/:id', isAuthorized, async (request, response) => {
    try {
        const userUpdated = await User.findByIdAndUpdate({ _id: request.params.id }, request.body, { new: true })
        return response.status(200).json(userUpdated)
    } catch (err) {
        return response.status(500).json({ message: err.message })
    }
})


module.exports = UserRouter;
