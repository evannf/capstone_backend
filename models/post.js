const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }

});

module.exports = mongoose.model('Post', postSchema);