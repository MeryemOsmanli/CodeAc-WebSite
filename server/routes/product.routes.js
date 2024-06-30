const express = require('express');
const ProductController = require('../controller/product.controller');
const router = express.Router()

// Get
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
// Post
router.post('/', ProductController.add)
// Delete
router.delete('/:id', ProductController.delete)
// Put
router.put('/:id', ProductController.edit)

module.exports = router