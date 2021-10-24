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
    }
}