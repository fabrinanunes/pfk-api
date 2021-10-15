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

        if(await Admin.findOne({ email })) return { error: 'User already exists' };

        const user = await Admin.create(data);
        user.password = undefined;

        return { user, token: generateToken({ id: user.id }) };
    },

    async signIn(data){
        const { email, password } = data;
        const user = await Admin.findOne({ email }).select('+password');
 
        if(!user) return { error: 'Email/Password incorrect'};
        
        if(!await bcrypt.compare(password, user.password))
        return { error: 'Email/Password incorrect'};
 
        user.password = undefined;
 
        return { user, token: generateToken({ id: user.id }) };
    }
}

const client = {
    async signUp(data){
        const { email } = data;

        if(await Client.findOne({ email })) return  { error: 'User already exists' };

        const user = await Client.create(data);
        const profile = await Profile.create({ user: user._id })
        user.password = undefined;

        return { user, token: generateToken({ id: user.id }) };
    },

    async signIn(data){
        const { email, password } = data;
        const user = await Client.findOne({ email }).select('+password');
 
        if(!user) return { error: 'Email/Password incorrect'};
        
        if(!await bcrypt.compare(password, user.password))
        return { error: 'Email/Password incorrect'};
 
        user.password = undefined;
 
        return { user, token: generateToken({ id: user.id })};
    }
}

const profile = {
    
}

module.exports = { admin, client, profile }