const mongoose = require('../config/database');

const CardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    card: {
        type: String,
    },
    last4CardNumber: {
        type: String,
    },
    expirationMonth: {
        type: String,
    },
    expirationYear: {
        type: String,
    }
})

const Cards = mongoose.model('Card', CardSchema)

module.exports = Cards