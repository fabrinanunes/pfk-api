const Solicitation = require('../models/solicitations');

const { admin } = require('../core/services/users');
const errorHandler = require('../core/erro-handler');

module.exports = {
    async singUp(req, res){
        try{
            const register = await admin.signUp(req.body)
            res.json(register)
        }catch(error){
            await errorHandler(error)
            res.status(400)
            res.send({'Message': error.error})
        }
    },

    async signIn(req,res){
        try {
            const login = await admin.signIn(req.body);
            res.json(login); 
        } catch (error) {
            await errorHandler(error)
            res.status(400)
            res.send({'Message': error.error})
        }
    },

    async solicitations(req, res){
        try{
            const listReq = await Solicitation.find()
            res.send(listReq)
        }catch(error){
            await errorHandler(error)
            res.status(400)
            res.send({'Message': error.error})
        }
    }
}