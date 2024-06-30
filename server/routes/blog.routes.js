const express = require('express')
const BlogController = require('../controller/blog.controller')
const router = express.Router()


// Get
router.get('/', BlogController.getAll)
router.get('/:id', BlogController.getOne)
// Post
router.post('/', BlogController.add)
// Delete
router.delete('/:id', BlogController.delete)
// Put
router.put('/:id', BlogController.edit)

module.exports = router