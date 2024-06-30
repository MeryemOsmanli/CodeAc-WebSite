const express = require('express');
const UserController = require('../controller/user.controller');
const protect = require('../middleware/auth.middleware');
const router = express.Router()

// Get 
router.get('/', UserController.getAll)
// Post
router.post('/register', UserController.register)
router.post('/login', UserController.login)
// Get
router.get('/getMe', protect, UserController.getMe)
// Put
router.put('/updateIsLogin/:id', UserController.updateUserIsLogin);
// Delete
router.delete('/:id', UserController.deleteUser)
// Get
router.get('/:id', UserController.getOne)
// Wishlist Routes
router.put('/addToWishlist/:productId', protect, UserController.addToWishlist);
router.put('/removeFromWishlist/:productId', protect, UserController.removeFromWishlist);

// Basket Routes
router.put('/addToBasket/:productId', protect, UserController.addToBasket);
router.put('/decreaseBasketItem/:productId', protect, UserController.decreasedBasket);
router.put('/deleteFromBasket/:productId', protect, UserController.removeItemFromBasket);
router.put('/clearBasket/:id', protect, UserController.clearBasket);



module.exports = router