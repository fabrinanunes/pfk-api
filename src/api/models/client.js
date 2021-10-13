const mongoose = require('../../config/database');
const bcrypt = require('bcryptjs');

const UserClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserClientSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash

    next();
})

const UserClient = mongoose.model('UserClient', UserClientSchema)

module.exports = UserClient