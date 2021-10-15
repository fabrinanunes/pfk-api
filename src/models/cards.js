const mongoose = require('../config/database');

const CardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    token: {
        type: String,
        required: true
    },
    last4CardNumber: {
        type: String,
        required: true
    },
    expirationMonth: {
        type: String,
        required: true
    },
    expirationYear: {
        type: String,
        required: true
    }
})

const Cards = mongoose.model('Card', CardSchema)

module.exports = Cards