const { body, param } = require("express-validator");
const productModel = require("../models/productModel");

const createProductValidation = [
    body('title')
    .exists()
    .withMessage("title is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in title")
    .bail()
    .isString()
    .withMessage("Please enter the title in String")
    .bail()
    .custom(value => {
        return productModel.findOne({title : value}).then(user => {
          if (user) {
            return Promise.reject('title already in use')
          }
        })
    })
    .bail(),
    body('description')
    .exists()
    .withMessage("description is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in description")
    .bail()
    .isString()
    .withMessage("Please enter the description in String")
    .bail(),
    body('price')
    .exists()
    .withMessage("price is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in price")
    .bail()
    .isDecimal()
    .withMessage("Please enter the price in Number/Decimal")
    .bail(),
    body('currencyId')
    .exists()
    .withMessage("currencyId is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in currencyId")
    .bail()
    .custom(value => {
        if (!['INR'].includes(value)){
            return Promise.reject('currencyId should be in [INR]')
        }
        return true
    })
    .bail(),
    body('currencyFormat')
    .exists()
    .withMessage("currencyFormat is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in currencyFormat")
    .bail()
    .custom(value => {
        if (!['₹'].includes(value)){
            return Promise.reject('currencyFormat should be [₹]')
        }
        return true
    })
    .bail(),
    body('isFreeShipping')
    .default(false)
    .notEmpty()
    .withMessage("Please enter the value in isFreeShipping")
    .bail()
    .isBoolean()
    .withMessage('isFreeShipping should be true/false')
    .bail(),
    body('productImage')
    .exists()
    .withMessage("productImage is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in productId")
    .bail()
    .isString()
    .withMessage("Please enter the productId in String")
    .bail(),
    body('style')
    .optional()
    .isString()
    .withMessage("Please enter the style in String")
    .bail(),
    body('availableSizes')
    .exists()
    .withMessage("availableSizes is required")
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in availableSizes")
    .bail()
    .isString()
    .withMessage("Please enter the availableSizes in String")
    .bail()
    .custom(value => {
        if (!value.split(', ').every(item => ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'].includes(item))){
            return Promise.reject('availableSizes should be [S, XS, M, X, L, XXL, XL]')
        }
        return true
    })
    .bail(),
    body('installments')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in installments")
    .bail()
    .isNumeric()
    .withMessage("Please enter the availableSizes in Number")
    .bail(),
    body('isDeleted')
    .default(false)
]

module.exports.createProductValidation = createProductValidation

const getProductValidation = [
    body('size')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in size")
    .bail()
    .isString()
    .withMessage("Please enter the size in String")
    .bail()
    .custom(value => {
        if (!value.split(', ').every(item => ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'].includes(item))){
            return Promise.reject('size should be [S, XS, M, X, L, XXL, XL]')
        }
        return true
    })
    .bail(),
    body('name')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in name")
    .bail()
    .isString()
    .withMessage("Please enter the name in String")
    .bail(),
    body('priceLessThan')
    .default(0)
    .bail()
    .notEmpty()
    .withMessage("Please enter the value in price")
    .bail()
    .isNumeric()
    .withMessage("Please enter the price in Number")
    .bail(),
    body('priceGreaterThan')
    .default(Math.pow(10,20))
    .notEmpty()
    .withMessage("Please enter the value in price")
    .bail()
    .isDecimal()
    .withMessage("Please enter the price in Number/Decimal")
    .bail(),
    body('priceSort')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in priceSort")
    .bail()
    .isNumeric()
    .withMessage("Please enter the priceSort in Number")
    .bail()
    .custom(value => {
        if (![1, -1].includes(Number(value))){
            return Promise.reject('priceSort should be 1 or -1')
        }
        return true
    })
    .bail()
]

module.exports.getProductValidation = getProductValidation

const getProductByIdValidation = [
    param('productId')
    .exists()
    .withMessage('productId should be present')
    .bail()
    .isMongoId()
    .withMessage('Invalid productId')
    .bail()
]

module.exports.getProductByIdValidation = getProductByIdValidation

const updateProductValidation = [
    param('productId')
    .exists()
    .withMessage('productId should be present')
    .bail()
    .isMongoId()
    .withMessage('Invalid productId')
    .bail(),
    body('title')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in title")
    .bail()
    .isString()
    .withMessage("Please enter the title in String")
    .bail()
    .custom(value => {
        return productModel.findOne({title : value}).then(user => {
          if (user) {
            return Promise.reject('title already in use')
          }
        })
    })
    .bail(),
    body('description')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in description")
    .bail()
    .isString()
    .withMessage("Please enter the description in String")
    .bail(),
    body('price')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in price")
    .bail()
    .isDecimal()
    .withMessage("Please enter the price in Number/Decimal")
    .bail(),
    body('currencyId')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in currencyId")
    .bail()
    .custom(value => {
        if (!['INR'].includes(value)){
            return Promise.reject('currencyId should be in [INR]')
        }
        return true
    })
    .bail(),
    body('currencyFormat')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in currencyFormat")
    .bail()
    .custom(value => {
        if (!['₹'].includes(value)){
            return Promise.reject('currencyFormat should be [₹]')
        }
        return true
    })
    .bail(),
    body('isFreeShipping')
    .default(false)
    .notEmpty()
    .withMessage("Please enter the value in isFreeShipping")
    .bail()
    .isBoolean()
    .withMessage('isFreeShipping should be true/false')
    .bail(),
    body('productImage')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in productId")
    .bail()
    .isString()
    .withMessage("Please enter the productId in String")
    .bail(),
    body('style')
    .optional()
    .isString()
    .withMessage("Please enter the style in String")
    .bail(),
    body('availableSizes')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in availableSizes")
    .bail()
    .isString()
    .withMessage("Please enter the availableSizes in String")
    .bail()
    .custom(value => {
        if (!value.split(', ').every(item => ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'].includes(item))){
            return Promise.reject('availableSizes should be [S, XS, M, X, L, XXL, XL]')
        }
        return true
    })
    .bail(),
    body('installments')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in installments")
    .bail()
    .isNumeric()
    .withMessage("Please enter the availableSizes in Number")
    .bail()
]

module.exports.updateProductValidation = updateProductValidation

const deleteProductValidation = [
    param('productId')
    .exists()
    .withMessage('productId should be present')
    .bail()
    .isMongoId()
    .withMessage('Invalid productId')
    .bail()
]

module.exports.deleteProductValidation = deleteProductValidation