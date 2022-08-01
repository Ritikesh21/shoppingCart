const { StatusCodes } = require("http-status-codes")
const productModel = require("../models/productModel")

const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body)
        return res.status(StatusCodes.CREATED)
        .json({status : true, data : product})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.createProduct = createProduct

const getProduct = async (req, res) => {
    try {
        const {size, name, priceLessThan, priceGreaterThan, priceSort} = req.body
        
        let product = await productModel.find({isDeleted : false})

        if (size){
            product = product.filter((item) => {
                if(item.availableSizes.includes(size)){
                    return true
                }
            })
        }

        if (name){
            product = product.filter((item) => {
                if (item.title == name){
                    return true
                }
            })
        }

        if (!(Number(priceLessThan) == 0 && Number(priceGreaterThan) == Math.pow(10, 20))){
            product = product.filter((item) => {
                if (Number(priceLessThan) < item.price < Number(priceGreaterThan)){
                    return true
                }
            }) 
        }

        if (Number(priceSort) == 1){
            product.sort((a, b) => {return a.price - b.price})
        }
        else if (Number(priceSort) == -1){
            product.sort((a, b) => {return b.price - a.price})
        }

        return res.status(StatusCodes.OK)
        .json({status : true, data : product})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.getProduct = getProduct

const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.productId)
        return res.status(StatusCodes.OK).json({status : true, data : product})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.getProductById = getProductById

const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.productId, req.body, {new : true})
        return res.status(StatusCodes.OK).json({status : true, data : product})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.updateProduct = updateProduct

const deleteProduct = async (req, res) =>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.productId)
        return res.status(StatusCodes.OK).json({status : true, data : product})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({status : true, message : error.message})
    }
}

module.exports.deleteProduct = deleteProduct