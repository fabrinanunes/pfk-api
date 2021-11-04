const mongoose = require('../config/database');

const DeleteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

const Delete = mongoose.model('Delete Account', DeleteSchema)

module.exports = Delete