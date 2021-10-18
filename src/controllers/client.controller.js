const { client } = require('../core/services/users');
const mailer = require('../core/services/mailer')

module.exports = {
    async singUp(req, res){
        try{
            const register = await client.signUp(req.body);
            const name = register.user.name;
            const email = register.user.email;
            mailer.signUp(email, name)
            res.json(register)
        }catch(error){
            console.log(error)
            return res.status(400).send({ error: 'Registration failed'})
        }
    },

    async signIn(req,res){
        try {
            const login = await client.signIn(req.body);
            res.json(login); 
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: "Login error" })
        }
    }
}