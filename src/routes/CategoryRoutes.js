const express = require('express')
const Category = require('../mongo/schemas/category')

const {
  isAdmin,
  isAuthorized,
  isUserOnTheDatabase,
} = require('../helpers/isAdmin')

const CategoriesRouter = express.Router()

//· POST!
CategoriesRouter.post('/', isAuthorized, async (request, response) => {
  const newCategory = new Category(request.body)
  try {
    await newCategory.save()
    response.json(newCategory)
  } catch (error) {
    response.status(500).json(error)
  }
})

// · GET by /:id!
CategoriesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  try {
    const category = await Category.findById(id)
    if (!category)
      return response.status(404).json({ message: 'No category found' })
    response.status(200).json(category)
  } catch (error) {
    response.status(500).json(error)
  }
})

CategoriesRouter.get('/', async (request, response) => {
  try {
    const categories = await Category.find()
    response.status(200).json(categories)
  } catch (error) {
    response.status(500).json(error)
  }
})

// · DELETE!
CategoriesRouter.delete('/:id', isAuthorized, async (request, response) => {
  try {
    const category = await Category.findByIdAndDelete(request.params.id)

    if (!category) response.status(404).send('No item found')
    response.status(200).json()
  } catch (error) {
    response.status(500).json(error)
  }
})

// · PATCH!
CategoriesRouter.patch('/:id', async (request, response) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    )
    if (!updatedCategory) {
      response.status(404).send('No item found')
    }
    response.status(200).json(updatedCategory)
  } catch (error) {
    response.status(500).json(error)
  }
})

module.exports = CategoriesRouter
