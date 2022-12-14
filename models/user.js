const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        default:''
    },
    bio:{
        type: String,
        default: ""
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
