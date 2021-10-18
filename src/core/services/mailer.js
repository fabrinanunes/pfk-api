const mailer = require('../vendor/sendgrid');

module.exports={
    signUp(email, name){
        const signUp = mailer.welcomeEmail(email, name)
        return signUp
    },

    purchase(email, name){
        const payment = mailer.purchase(email, name)
        return payment
    }
}