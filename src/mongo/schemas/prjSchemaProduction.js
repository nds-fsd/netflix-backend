const { Schema, model } = require('mongoose')

//* This is related to the languages availables
const projectSchemaMoviesProduction = new Schema({
  prj_castCrew: { type: String, required: true, unique: true },
  prj_director: { type: String, required: true, unique: true },
  prj_producer: { type: String, required: true, unique: true },
})

const projectMoviesProduction = model('Project', projectSchemaMoviesProduction)
module.exports = { projectMoviesProduction }
