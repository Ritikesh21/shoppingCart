const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fname: {
        type : String
        },
    lname: {
        type : String
    },
    email: {
        type : String
    },
    profileImage: {
        type : String
    },
    phone: {
        type : String
    }, 
    password: {
        type : String
    },
    address: {
      shipping: {
        street: {
            type : String
        },
        city: {
            type : String
        },
        pincode: {
            type : Number
        }
      },
      billing: {
        street: {
            type : String
        },
        city: {
            type : String
        },
        pincode: {
            type : Number
        }
      }
    }
}, {timestamps : true})

module.exports = mongoose.model('user', UserSchema)