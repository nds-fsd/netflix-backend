const { Schema, model } = require('mongoose')

//* This is related to the movies list
const Movie = new Schema({
    prj_urlImgMovie: { type: String, required: true, unique: true },
    prj_urlImgModal: { type: String, require: true, unique : true},
    prj_title: { type: String, required: true, unique: true },
    prj_description: { type: String, required: true, unique: true },
    prj_rating: { type: String, required: true },
    prj_runtime: { type: String, required: true }
})

const projectMovies = model('movie', Movie)
module.exports = projectMovies;
