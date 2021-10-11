const mongoose = require('../database');

const FlightSchema = new mongoose.Schema({
    flight: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    depatureDate: {
        type: String,
        required: true
    },
    depatureTime: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
})

const Flights = mongoose.model('Flights', FlightSchema)

module.exports = Flights