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
    favoriteMeat:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

// const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);