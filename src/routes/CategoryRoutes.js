const express = require('express')
const Category = require('../mongo/schemas/category')

const {
  isAdmin,
  isAuthorized,
  isUserOnTheDatabase,
} = require('../helpers/isAdmin')

const CategoriesRouter = express.Router()

CategoriesRouter.post('/', isAuthorized, async (request, response) => {
  const newCategory = new Category(request.body)
  try {
    await newCategory.save()
    response.json(newCategory)
  } catch (error) {
    response.status(500).json(error)
  }
})



CategoriesRouter.patch('/:id', isAuthorized, async (request, response) => {})

module.exports = CategoriesRouter
