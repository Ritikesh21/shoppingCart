const { StatusCodes } = require("http-status-codes")
const cartModel = require("../models/cartModel")
const orderModel = require("../models/orderModel")

const createOrder = async (req, res) => {
    try {
        let data = await cartModel.findOne({userId : req.params.userId})
        if(!data){
            return res.status(StatusCodes.NOT_FOUND).json({status : false, message : error.message})
        } 
        let totalQuantity = 0
        data.items.forEach(element => {
            totalQuantity += element.quantity
        })
        data = {...data._doc, totalQuantity : totalQuantity, cancellable : true, status : 'pending', isDeleted : false}

        const order = await orderModel.create(data)
        return res.status(StatusCodes.CREATED).json({status : true, data : order})

    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.createOrder = createOrder

const getOrder = async(req, res) => {
    try {
        const order = await orderModel.findById(req.body.orderId)
        return res.status(StatusCodes.OK).json({status : true, data : order})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.getOrder = getOrder

const updateOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndUpdate({_id : req.body.orderId}, {status : req.body.status}, {new : true})
        return res.status(StatusCodes.OK).json({status : true, data : order})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.updateOrder = updateOrder

const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete({_id : req.body.orderId})
        return res.status(StatusCodes.OK).json({status : true, data : order})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : false, message : error.message})
    }
}

module.exports.deleteOrder = deleteOrder