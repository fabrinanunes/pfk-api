const mongoose = require('../config/database');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    cards: [{
        type: String,
    }],
    flights: [{
        type: String,
    }]
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile