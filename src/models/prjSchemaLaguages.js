const { Schema, model } = require('mongoose')

//* This is related to the languages availables
const projectSchemaMoviesLanguage = new Schema({
  prj_originalLanguage: { type: String, required: true, unique: true },
  prj_otherLanguagues: { type: Date, default: Date.now },
})

const projectMoviesLanguages = model('Project', projectSchemaMoviesLanguage)
module.exports = { projectMoviesLanguages }
