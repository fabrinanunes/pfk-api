const Cards = require('../models/cards');
const Profile = require('../models/profile');
const Client = require('../models/client');
const Delete = require('../models/delete-request');
const mongoose = require('mongoose');
const { client } = require('../core/services/users');
const mailer = require('../core/services/mailer');
const errorHandler = require('../core/erro-handler');

module.exports = {
    async singUp(req, res){
        try{
            const register = await client.signUp(req.body);
            const name = register.user.name;
            const email = register.user.email;
            mailer.signUp(email, name)
            res.json(register)
        }catch(error){
            await errorHandler(error)
            res.status(400)
            res.send({'Message': error.error})
        }
    },

    async signIn(req,res){
        try {
            const login = await client.signIn(req.body);
            res.json(login); 
        } catch (error) {
            await errorHandler(error)
            res.status(400)
            res.send({'Message': error.error})
        }
    },

    async showCards(req, res){
        try{
            const userId = mongoose.Types.ObjectId(req.userId)
            const show = await Cards.find({user: userId})
            res.send(show)
        }catch(err){
            errorHandler(error)
            res.status(400).send(error)
        }
    },

    async profile(req, res){
        try {
            const userId = mongoose.Types.ObjectId(req.userId)
            const profile = await Profile.find({user: userId})
            res.send(profile)
        } catch (error) {
            errorHandler(error)
            res.status(400).send(error)
        }
    },

    async delete(req, res){
        try{
            const user = await Client.findById({_id: req.userId})
            const profile = await Profile.find({user: req.userId})
            const email = profile[0].email
            if(await Delete.findOne({ email })) throw { error: 'You already requested to delete your account'}
            const deleted = {
                user: user._id,
                profile: profile[0]._id,
                name: profile[0].name,
                email: profile[0].email
            }
            const deleteAccount = await Delete.create(deleted)
            res.json(deleteAccount)
        }catch(error){
            errorHandler(error)
            res.status(400).send(error)
        }
    }
}