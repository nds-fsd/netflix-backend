const express = require('express')
const projectController = require('../../controllers/projectController')
const router = express.Router()

router.get('/', projectController.project_get_all)
router.get('/:id', projectController.project_get_byID)
router.post('/', projectController.project_create)
router.delete('/:id', projectController.project_delete)

module.exports = router
