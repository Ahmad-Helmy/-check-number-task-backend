const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema= new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },'key')
}

const User = mongoose.model("User",UserSchema)

module.exports=User