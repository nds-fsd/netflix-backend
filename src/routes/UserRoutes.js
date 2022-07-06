const express = require('express');
const { User } = require('../mongo/schemas/user');
const verifyToken = require('../helpers/verifyToken');
const {isAdmin} = require('../helpers/isAdmin');


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

//  DELETE one user
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


UserRouter.patch('/:id',  async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) response.status(404).json({ message: 'User not found' })
        if (request.auth.id !== request.params.id && request.auth.role !== 'ADMIN') {
            return response.status(403).json({ message: 'Not authorized' })
        } else {
            const userUpdated = await User.findByIdAndUpdate({ _id: request.params.id }, request.body, { new: true })
            return response.status(200).json(userUpdated)
        }
        
    } catch (err) {
        return response.status(500).json({ message: err.message })
    }

    
})



module.exports = UserRouter;
