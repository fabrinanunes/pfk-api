const Solicitation = require('../models/solicitations');

const { admin } = require('../core/services/users');

module.exports = {
    async singUp(req, res){
        try{
            const register = await admin.signUp(req.body)
            res.json(register)
        }catch(error){
            console.log
            return res.status(400).send({ error: 'Registration failed'})
        }
    },

    async signIn(req,res){
        try {
            const login = await admin.signIn(req.body);
            res.json(login); 
        } catch (error) {
            return res.status(400).send({ error: "Login error" })
        }
    },

    async solicitations(req, res){
        const listReq = await Solicitation.find()
        res.send(listReq)
    }
}