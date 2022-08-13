const { response } = require("express")
const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
const { secretKey } = require("../config")
const { listIndexes } = require("../models/userModel")
const userModel = require("../models/userModel")

const createUser = async (req, res) => {
    try {
        const user = await userModel.create(req.body)
        if (!user){
            res.status(StatusCodes.NOT_ACCEPTABLE)
            .json({status : false, message : "user not registered try later"})
        }
        return res.status(StatusCodes.CREATED)
        .json({status : true, data : user})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
} 

module.exports.createUser = createUser

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne(req.body)
        if (!user){
            return res.status(StatusCodes.NOT_ACCEPTABLE)
            .json({status : false, message : "User not Registered yet please registered before"})
        }
        const token = jwt.sign({
            user : user._id
        }, secretKey, {expiresIn : "10h"})
        return res.status(StatusCodes.OK)
        .json({status : true, data : {userId : user._id, token : token}})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.loginUser = loginUser

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
        return res.status(StatusCodes.OK)
        .json({status : true, data : user})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.getUser = getUser

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.userId, req.body, {new : true})
        return res.status(StatusCodes.OK)
        .json({status : true, data : user})
    } catch (error) {
        return res.status(StatusCodes.EXPECTATION_FAILED)
        .json({status : false, message : error.message})
    }
}

module.exports.updateUser = updateUser