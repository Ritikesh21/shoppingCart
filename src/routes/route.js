const express = require('express')
const { createCart, updateCart } = require('../controller/cartController')
const { createOrder, getOrder, updateOrder, deleteOrder } = require('../controller/orderController')
const { createProduct, getProduct } = require('../controller/productController')
const { createUser, loginUser, updateUser, getUser } = require('../controller/userController')
const { validatorError } = require('../middleware/errorHandler')
const { createCartValidation, updateCartValidation } = require('../validation/cartValidation')
const { createOrderValidation, updateOrderValidation, orderValidation } = require('../validation/orderValidation')
const { createProductValidation, getProductValidation } = require('../validation/productValidation')
const {createUserValidation, loginUserValidation, updateUserValidation, getUserValidation} = require('../validation/userValidation')
const router = express.Router()

//User
router.post('/user', createUserValidation, validatorError, createUser)
router.post('/login', loginUserValidation, validatorError, loginUser)
router.get('/user/:userId/profile', getUserValidation, validatorError, getUser)
router.put('/user/:userId/profile', updateUserValidation, validatorError, updateUser)

//Product
router.post('/product', createProductValidation, validatorError, createProduct)
router.get('/products', getProductValidation, validatorError, getProduct)

//cart
router.post('/user/:userId/cart', createCartValidation, validatorError, createCart)
router.put('/user/:userId/cart', updateCartValidation, validatorError, updateCart)

// Order
router.post('/users/:userId/orders', createOrderValidation, validatorError, createOrder)
router.get('/users/:userId/orders', orderValidation, validatorError, getOrder)
router.put('/users/:userId/orders', updateOrderValidation, validatorError, updateOrder)
router.delete('/users/:userId/orders', orderValidation, validatorError, deleteOrder)

module.exports = router