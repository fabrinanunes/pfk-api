const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Client = require('../models/client');

function generateToken(params = {}){
    return jwt.sign(params, process.env.SECRET,{
        expiresIn:86400,
    });
}

module.exports = {
    async create(req, res){
        const { email } = req.body;

        try{
            if(await Client.findOne({ email })) return res.status(400).send({ error: 'User already exists' })

            const user = await Client.create(req.body)

            user.password = undefined;

            res.send({ user, token: generateToken({ id: user.id }) });
        } catch(err){
            return res.status(400).send({ error: 'Registration failed'})
        }
    },
    
    async auth(req, res){
        const { email, password } = req.body;
        const user = await Client.findOne({ email }).select('+password');
 
        if(!user) return res.status(400).send({ error: 'Email incorrect'});
        
        if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Password incorrect'});
 
        user.password = undefined;
 
        res.send({ user, token: generateToken({ id: user.id }) });
    }
}