const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const {param, body} = require('express-validator')

const createOrderValidation = [
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
]

module.exports.createOrderValidation = createOrderValidation

const updateOrderValidation = [
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
    body('orderId')
    .exists()
    .withMessage('orderId does not exists')
    .bail()
    .isMongoId()
    .withMessage('Invalid orderId')
    .bail()
    .custom(value => {
        return orderModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('Order Not Found')})
    })
    .bail(),
    body('status')
    .optional()
    .notEmpty()
    .withMessage("Please enter the value in status")
    .bail()
    .isString()
    .withMessage("Please enter the status in String")
    .bail()
    .custom(value => {
        if (!value.split(', ').every(item => ['pending', 'completed', 'cancelled'].includes(item))){
            return Promise.reject('status should be [pending, completed, cancled]')
        }
        return true
    })
    .bail()
]

module.exports.updateOrderValidation = updateOrderValidation

const orderValidation = [
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
    body('orderId')
    .exists()
    .withMessage('orderId does not exists')
    .bail()
    .isMongoId()
    .withMessage('Invalid orderId')
    .bail()
    .custom(value => {
        return orderModel.findById(value).then(() => {return true})
        .catch(() => {return Promise.reject('Order Not Found')})
    })
    .bail()
]

module.exports.orderValidation = orderValidation