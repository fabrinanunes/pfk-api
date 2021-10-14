const mongoose = require('../config/database');
const bcrypt = require('bcryptjs');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    flights:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    }]
})

ProfileSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash

    next();
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile