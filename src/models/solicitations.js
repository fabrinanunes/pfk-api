const mongoose = require('../config/database');

const ReqSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    paymentId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
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

const Solicitations = mongoose.model('Solicitation', ReqSchema)

module.exports = Solicitations