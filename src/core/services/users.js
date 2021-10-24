const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const Admin = require('../../models/admin');
const Client = require('../../models/client');
const Profile = require('../../models/profile');

function generateToken(params = {}){
    return jwt.sign(params, process.env.SECRET,{
        expiresIn:86400,
    });
}

const admin = {
    async signUp(data){
        const { email } = data;

        if(await Admin.findOne({ email })) throw { error: 'User already exists' };

        const user = await Admin.create(data);
        user.password = undefined;

        return { user, token: generateToken({ id: user.id }) };
    },

    async signIn(data){
        const { email, password } = data;
        const user = await Admin.findOne({ email }).select('+password');
 
        if(!user) throw { error: 'Email/Password incorrect'};
        
        if(!await bcrypt.compare(password, user.password))
        throw { error: 'Email/Password incorrect'};
 
        user.password = undefined;
 
        return { user, token: generateToken({ id: user.id }) };
    }
}

const client = {
    async signUp(data){
        const { email } = data;

        if(await Client.findOne({ email })) throw { error: 'User already exists' };

        const user = await Client.create(data);
        const profile = await Profile.create({ user: user._id, name: user.name, email: user.email})

        user.password = undefined;
        return { user, token: generateToken({ id: user.id }) };
    },

    async signIn(data){
        const { email, password } = data;
        const user = await Client.findOne({ email }).select('+password');
 
        if(!user) throw { error: 'Email/Password incorrect'};
        
        if(!await bcrypt.compare(password, user.password))
        throw { error: 'Email/Password incorrect'};
 
        user.password = undefined;
 
        return { user, token: generateToken({ id: user.id })};
    }
}

module.exports = { admin, client}