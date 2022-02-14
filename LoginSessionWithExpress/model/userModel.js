var dbClient = require('../db/db');
const {Schema} = require('mongoose');

var userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String
})

const userModel = dbClient.model('users', userSchema);
module.exports.userModel = userModel;
