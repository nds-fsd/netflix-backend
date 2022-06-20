const { Schema, model } = require('mongoose')
const jwtSecret = process.env.JWT_SECRET
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


//* This is related to the user register
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
})


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateJWT = function (user) {
  const today = new Date()
  const expirationDate = new Date()
  expirationDate.setDate(today.getDate() + 60)

  let payload = {
    id: this._id,
    email: this.email,
    name: this.name
  }

  return jwt.sign(payload, jwtSecret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  })
}




const User = model('User', userSchema)
module.exports = User
