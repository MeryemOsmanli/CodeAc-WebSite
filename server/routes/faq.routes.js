const express = require('express')
const FaqController = require('../controller/faq.controller')
const router = express.Router()

// Get
router.get('/', FaqController.getAll)
router.get('/:id', FaqController.getOne)
// Post
router.post('/', FaqController.add)
// Delete
router.delete('/:id', FaqController.delete)
// Put
router.put('/:id', FaqController.edit)

module.exports = router