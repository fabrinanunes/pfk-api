const mongoose = require('../config/database');

const ChargeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    paymentId: {
        type: String
    },
    chargeId:{
        type: String
    },
    flight:{
        type: String
    },
    amount:{
        type: String
    },
    card:{
        type: String
    }
})

const Charges = mongoose.model('Charge', ChargeSchema)

module.exports = Charges