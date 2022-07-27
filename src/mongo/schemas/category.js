/*Category entity + router#33
Description

{
title,
description
}

These can only be created/updated/deleted by ADMIN users
Must relate Movies with Categories 

*/

const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  action: { type: String, required: true },
  comedy: { type: String, required: true },
  drama: { type: String, required: true },
  fantasy: { type: String, required: true },
  horror: { type: String, required: true },
  mystery: { type: String, required: true },
  romance: { type: String, required: true },
  thriller: { type: String, required: true },
})

const Category = model('Category', categorySchema)
module.exports = Category
