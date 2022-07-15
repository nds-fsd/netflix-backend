const express = require('express');
const Movie = require('../mongo/schemas/movie');



const MovieRouter = express.Router();
// · GET all Movies / !
MovieRouter.get('/', async (request, response) => {
    const {favs, name} = request.query;
    let mongoQuery = {}; 
    if (favs) {
        const query = JSON.parse(favs);
        mongoQuery["_id"] = {$in: query}
    }
    if (name) {
        mongoQuery["title"] = {$regex: name }
    }
    const movies = await Movie.find(mongoQuery)
    try {
        response.send(movies)
    } catch (error) {
        response.status(500).json(error)
    }
})

// · GET by /:id!
MovieRouter.get('/:id', async (request, response, next) => {
    console.log(request.params.id)
    try {
        const { id } = request.params
        const movie = await Movie.findOne({
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
MovieRouter.post('/', async (request, response) => {
    const newMovie = new Movie(request.body)
    try {
        await newMovie.save()
        response.json(newMovie)
    } catch (error) {
        response.status(500).json(error)
    }
});




// · DELETE!
MovieRouter.delete('/:id', async (request, response) => {
    try {
        const movie = await Movie.findByIdAndDelete(request.params.id)

        if (!movie) response.status(404).send('No item found')
        response.status(200).json()
    } catch (error) {
        response.status(500).json(error)
    }
})

// · PUT!
MovieRouter.patch('/:id', async (request, response) => {
    try {
        const movie = await Movie.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!movie) {
            response.status(404).send('No item found')
        }
        response.status(200).json(movie)
    } catch (error) {
        response.status(500).json(error)
    }
})



module.exports = MovieRouter;
