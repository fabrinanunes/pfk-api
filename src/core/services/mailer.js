const mailer = require('../vendor/sendgrid');

module.exports={
    signUp(email, name){
        const signUp = mailer.welcomeEmail(email, name)
        return signUp
    },

    purchase(email, res){
        const payment = mailer.purchase(email, res)
        return payment
    },

    refund(email, name){
        const payment = mailer.refund(email, name)
        return payment
    }
}