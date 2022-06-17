const { Schema, model } = require('mongoose')

//* This is related to the user register
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
})

const User = model('User', userSchema)
module.exports = User
