const mongoose = require('../database');

const ReqSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserClient'
    },
    paymentId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
})

const Solicitations = mongoose.model('Solicitation', ReqSchema)

module.exports = Solicitations