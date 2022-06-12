const { Schema, model } = require('mongoose')

//* This is related to the movies list
const Project = new Schema({
  prj_title: { type: String, required: true, unique: true },
  prj_description: { type: String, required: true, unique: true },
  prj_rating: { type: String, required: true },
  prj_runtime: { type: String, required: true },
})

const projectMovies = model('Project', Project)
module.exports = { projectMovies }
