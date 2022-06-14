const { Schema, model } = require('mongoose')

//* This is related to the dates
const projectSchemaMoviesDate = new Schema({
  prj_releaseDateTheaters: { type: String, required: true, unique: true },
  prj_releasingDateStreaming: { type: Date, default: Date.now },
})

const projectMoviesDate = model('Project', projectSchemaMoviesDate)
module.exports = { projectMoviesDate }
