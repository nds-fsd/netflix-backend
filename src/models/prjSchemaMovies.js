const mongoose = require('mongoose')

//* This is related to the movies list
const prjSchemaMovies = new mongoose.Schema({
  prj_urlImgMovie: { type: String, required: true },
  prj_title: { type: String, required: true, unique: true },
  prj_description: { type: String, required: true, unique: true },
  prj_rating: { type: String, required: true },
  prj_runtime: { type: String, required: true },
})

const ProjectMovies = mongoose.model('ProjectMovies', prjSchemaMovies)
module.exports = ProjectMovies
