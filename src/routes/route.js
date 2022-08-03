const express = require('express')

const { createCart, updateCart, deleteCart, getCart } = require('../controller/cartController')
const { createOrder, getOrder, updateOrder, deleteOrder } = require('../controller/orderController')
const { createProduct, getProduct, updateProduct, getProductById, deleteProduct } = require('../controller/productController')
const { createUser, loginUser, updateUser, getUser } = require('../controller/userController')

const { authentication } = require('../middleware/auth')
const { validatorError } = require('../middleware/errorHandler')

const { createCartValidation, updateCartValidation, getCartValidation, deleteCartValidation } = require('../validation/cartValidation')
const { createOrderValidation, updateOrderValidation, orderValidation } = require('../validation/orderValidation')
const { createProductValidation, getProductValidation, getProductByIdValidation, updateProductValidation, deleteProductValidation } = require('../validation/productValidation')
const {createUserValidation, loginUserValidation, updateUserValidation, getUserValidation} = require('../validation/userValidation')

const router = express.Router()

//User
router.post('/user', createUserValidation, validatorError, createUser)
router.post('/login', loginUserValidation, validatorError, loginUser)
router.get('/user/:userId/profile', getUserValidation, validatorError, authentication, getUser)
router.put('/user/:userId/profile', updateUserValidation, validatorError, authentication, updateUser)

//Product
router.post('/product', createProductValidation, validatorError, createProduct)
router.get('/products', getProductValidation, validatorError, getProduct)
router.get('/products/:productId', getProductByIdValidation, validatorError, getProductById)
router.put('/products/:productId', updateProductValidation, validatorError, updateProduct)
router.delete('/products/:productId', deleteProductValidation, validatorError, deleteProduct)

//cart
router.post('/user/:userId/cart', createCartValidation, validatorError, authentication, createCart)
router.put('/user/:userId/cart', updateCartValidation, validatorError, authentication, updateCart)
router.get('/user/:userId/cart', getCartValidation, validatorError, authentication, getCart)
router.delete('/user/:userId/cart', deleteCartValidation, validatorError, authentication, deleteCart)

// Order
router.post('/users/:userId/orders', createOrderValidation, validatorError, authentication, createOrder)
router.get('/users/:userId/orders', orderValidation, validatorError, authentication, getOrder)
router.put('/users/:userId/orders', updateOrderValidation, validatorError, authentication, updateOrder)
router.delete('/users/:userId/orders', orderValidation, validatorError, authentication, deleteOrder)

module.exports = router