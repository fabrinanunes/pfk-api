const mongoose = require('../../config/database/index');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
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

AdminSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash

    next();
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin