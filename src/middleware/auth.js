const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
const secretKey = require('../config')

const authentication = async (req, res, next) => {
    if (req.params.userId != jwt.verify(req.headers['authorization'].split(' ')[1], secretKey, (err) => {
        if(Object.keys(err).length){
            return res.status(StatusCodes.UNAUTHORIZED).json(err)
        }
    })){
        next()
    }
}

module.exports.authentication = authentication