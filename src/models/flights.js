const mongoose = require('../config/database');

const FlightSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    flight: {
        type: String,
        required: true
    },
    chargeId:{
        type: String
    }
})

const FlightPurchase = mongoose.model('FlightPurchase', FlightSchema)

module.exports = FlightPurchase