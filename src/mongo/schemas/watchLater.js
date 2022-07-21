const { Schema, model } = require('mongoose')
const User = mongoose.model('User')
const Movie = mongoose.model('movie')

const watchLater = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  movie: { type: Schema.ObjectId, ref: 'movie' },
})

const Watch = model('Watch', watchLater)
module.exports = Watch

/*
Create a new Schema for entity WatchLater that makes a relation between USERS and Movies:

NxN relationship

{
user: id,
movie: id

}




*/
