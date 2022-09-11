const { Schema, model } = require('mongoose')

//* This is related to the movies list
const MovieSchema = new Schema({
  urlImgMovie: { type: String, required: true },
  urlImgModal: { type: String, require: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  rating: { type: String, required: true },
  runtime: { type: String, required: true },
  castCrew: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  originalLanguage: { type: String, required: true },
  otherLanguagues: [{ type: String }],
  releaseDateTheaters: { type: Date, required: true },
  releaseDateStreaming: { type: Date, required: true },
  category: { type: Schema.ObjectId, ref: 'Category' },
})

const Movie = model('movie', MovieSchema)
module.exports = Movie
