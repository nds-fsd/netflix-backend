const { Schema, model } = require('mongoose')
require('dotenv').config();
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
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    requiere: true
  }
  favs: [{type: String}]
})

userSchema.pre('save', function(next){
	if(!this.isModified('password')) return next();
	const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
	this.password = hash;
	next();
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
};

const generateJWT = function (user) {
  const today = new Date()
  const expirationDate = new Date()
  expirationDate.setDate(today.getDate() + 60)

  let payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }

  return jwt.sign(payload, jwtSecret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  })
}

const User = model('User', userSchema)
module.exports = { User, generateJWT };
