const { Schema, model } = require('mongoose')

//* This is related to the user register
const projectSchemaUser = new Schema({
  prj_email: { type: String, required: true, unique: true },
  prj_password: { type: String, required: true },
  prj_createDate: { type: Date, default: Date.now },
  prj_updateDate: { type: Date, default: Date.now },
})

const projectUser = model('Project', projectSchemaUser)
module.exports = { projectUser }
