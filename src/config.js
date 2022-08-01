const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    port : process.env.port,
    mongoString : process.env.mongoString,
    secretKey : process.env.secretKey
}