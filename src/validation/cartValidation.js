const { body, param, header } = require("express-validator")
const { StatusCodes } = require("http-status-codes")
const userModel = require('../models/userModel')
const productModel = require('../models/productModel')
const cartModel = require("../models/cartModel")

const createCartValidation = [
    param('userId')
    .exists()
    .withMessage('userId does not exists')
    .bail()
    .isMongoId()
    .withMessage('Invalid userId')
    .bail()
    .custom(value => {
        return userModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('User Not Found')})
    })
    .bail(),
    body('productId')
    .exists()
    .withMessage('productId does not exists')
    .bail()
    .notEmpty()
    .withMessage('Please enter the value in productId')
    .bail()
    .isMongoId()
    .withMessage('Invalid productId')
    .bail()
    .custom(value => {
        return productModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('Product Not Found')})
    })
    .bail(),
    body('quantity')
    .exists()
    .withMessage('quantity does not exists')
    .bail()
    .notEmpty()
    .withMessage('Please enter the value in quantity')
    .bail()
    .isNumeric()
    .withMessage('quantity should be in Number')
    .bail()
]

module.exports.createCartValidation = createCartValidation

const getCartValidation = [
    param('userId')
    .exists()
    .withMessage('userId does not exists')
    .bail()
    .isMongoId()
    .withMessage('Invalid userId')
    .bail()
    .custom(value => {
        return userModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('User Not Found')})
    })
    .bail(),
    body('cartId')
    .exists()
    .withMessage('cartId Not Found')
    .bail()
    .isMongoId()
    .withMessage('Invalid cartId')
    .bail()
]

module.exports.getCartValidation = getCartValidation

const updateCartValidation = [
    param('userId')
    .exists()
    .withMessage('userId does not exists')
    .bail()
    .isMongoId()
    .withMessage('Invalid userId')
    .bail()
    .custom(value => {
        return userModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('User Not Found')})
    })
    .bail(),
    body('cartId')
    .exists()
    .withMessage('cartId Not Found')
    .bail()
    .isMongoId()
    .withMessage('Invalid cartId')
    .bail(),
    body('productId')
    .optional()
    .notEmpty()
    .withMessage('Please enter the value in productId')
    .bail()
    .isMongoId()
    .withMessage('Invalid productId')
    .bail()
    .custom(value => {
        return productModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('Product Not Found')})
    })
    .bail(),
    body('quantity')
    .optional()
    .notEmpty()
    .withMessage('Please enter the value in quantity')
    .bail()
    .isNumeric()
    .withMessage('quantity should be in Number')
    .bail()
]

module.exports.updateCartValidation = updateCartValidation

const deleteCartValidation = [
    param('userId')
    .exists()
    .withMessage('userId does not exists')
    .bail()
    .isMongoId()
    .withMessage('Invalid userId')
    .bail()
    .custom(value => {
        return userModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('User Not Found')})
    })
    .bail(),
    body('cartId')
    .exists()
    .withMessage('cartId Not Found')
    .bail()
    .isMongoId()
    .withMessage('Invalid cartId')
    .bail()
]

module.exports.deleteCartValidation = deleteCartValidation