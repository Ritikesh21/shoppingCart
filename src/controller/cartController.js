const { StatusCodes } = require("http-status-codes")
const cartModel = require("../models/cartModel")
const productModel = require("../models/productModel")

const createCart = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.productId)

        const cart = await cartModel.findOne({userId : req.params.userId})
        if(!cart) {
            const data = await cartModel.create({userId : req.params.userId, items : [req.body], totalPrice : (product.price * Number(req.body.quantity)), totalItems : 1})
            return res.status(StatusCodes.CREATED).json({status : true, data : data})
        }
        let temp = cart.items.filter(Element => {
            if (Element.productId == req.body.productId){
                return true
            }
            return false
        })
        if (temp.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({status : false, message : "product already added"})
        }
        const data = await cartModel.findOneAndUpdate({userId : req.params.userId}, {items : [...cart.items, req.body], totalPrice : cart.totalPrice + (product.price * Number(req.body.quantity)), totalItems : cart.totalItems + 1}, {new : true})

        return res.status(StatusCodes.CREATED).json({status : true, data : data}) 
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.createCart = createCart

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findById(req.body.cartId)
        .then(() => {return res.status(StatusCodes.OK).json({status : true, data : cart})})
        .catch(() => {return res.status(StatusCodes.NOT_FOUND).json({status : true, message : 'cart does not exist.'})})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.getCart = getCart

const updateCart = async (req, res) => {
    try {
        let cart = await cartModel.findById(req.body.cartId)

        if (!cart){
            return res.status(StatusCodes.NOT_FOUND).json({status : false, message : "cart Not Found"})
        } 

        const upd = cart.items.filter(obj => {
            if (obj.productId == req.body.productId){
                if(Boolean(req.body.removeProduct) == true || Number(req.body.quantity) == 0){
                    cart.totalItems -= 1
                    cart.totalPrice -= (obj.quantity * product.price)
                    return false
                }
                if(req.body.quantity){
                    const product = productModel.findById(obj.productId)
                    cart.totalPrice = cart.totalPrice - (obj.quantity * product.price) + (Number(req.body.quantity) * product.price)
                    obj.quantity = req.body.quantity
                }
            }
            return true
        })
        const data = await cartModel.findByIdAndUpdate(req.body.cartId, {items : upd, totalItems : cart.totalItems, totalPrice : cart.totalPrice}, {new : true})

        return res.status(StatusCodes.OK).json({status : true, data : data})

    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.updateCart = updateCart

const deleteCart = async (req, res) => {
    try {
        const cart = await cartModel.findByIdAndDelete(req.body.cartId)
        .then((cart) => {return res.status(StatusCodes.OK).json({status : true, data : cart})})
        .catch((error) => {return res.status(StatusCodes.NOT_FOUND).json({status : false, message : error.message})})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.deleteCart = deleteCart