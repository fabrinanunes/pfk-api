const mongoose = require('../config/database');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    flights:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flights'
    }]
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile