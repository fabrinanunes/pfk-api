const mongoose = require('../config/database');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    cards: [{
        type: String,
        required: true
    }],
    flights:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flights'
    }]
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile