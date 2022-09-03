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
  title: { type: String, required: true },
  description: { type: String, required: true },
})

const Category = model('Category', categorySchema)
module.exports = Category
