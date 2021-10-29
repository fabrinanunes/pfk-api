// process.env.NODE_TLS_REJECT_UNAUTHORIZED
const mongoose = require('mongoose');
const Solicitations = require('../models/solicitations');
const Charges = require('../models/charges');
const Profile = require('../models/profile');
const Cards = require('../models/cards');
const FlightPurchase = require('../models/flights');

const finances = require('../core/services/finances');
const mailer = require('../core/services/mailer');
const errorHandler = require('../core/erro-handler');

module.exports = {
    async balance(req, res){
        try{
            const list = await finances.balance()
            res.json(list.balance)
        }catch(error){
            await errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async charge(req, res, next){
        try {
            const charge = await finances.charge(req.body);
            const flight = req.body.charge.description;
            const userId = req.userId
            const chargeId = charge[0].id

            const flightSchema = await FlightPurchase.create({flight: flight, user: userId, chargeId: chargeId})

            const profile = await Profile.findOne({user: req.userId})

            const profileUpdate = await Profile.updateOne({user: req.userId, flights: [...profile.flights, flight]}
            )
            const purchase = await Charges.create({flight: flight, chargeId: chargeId})

            const cepData = req.body.billing.address.postCode;
            
            res.json(charge)
        }catch(error){
            errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async status(req, res){
        try{
            const id = req.params.id;
            const charge = await finances.status(id);
            return res.json(charge)
        }catch(error){
            errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async list(req, res){
        try {
            const list = await finances.list()
            return res.json(list)
        } catch(error){
            errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async payment(req, res){
        try{
            const payment = await finances.payment(req.body);
            const paymentData = {
                user: req.userId,
                paymentId: payment.id,
                card: req.body.creditCardDetails.creditCardId,
                amount: payment.amount
            }
            const email = req.body.billing.email;
            const paymentMail = res.id
            mailer.purchase(email, paymentMail)
            const paymentDb = await Charges.updateMany(paymentData);
            return res.json(payment);
        }catch(error){
            errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async refund(req, res){
        try{
            const id = req.params.id;
            const refund = await finances.refund(id, req.body.amount)
            mailer.refund(req)
            res.json(refund)
        }catch(error){
            errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async tokenization(req, res){
        try{
            const saveCard = await finances.tokenization(req.body.creditCardHash);
            const payload = {
                user: req.userId,
                card: saveCard.creditCardId,
                last4CardNumber: saveCard.last4CardNumber,
                expirationMonth: saveCard.expirationMonth,
                expirationYear: saveCard.expirationYear
            }
            const card = await Cards.findOne({card: payload.card})
            if(card == null){
                await Cards.create(payload)
            }
            
            const profile = await Profile.findOne({ user: req.userId })
            const profileUpdate = await Profile.updateOne(
                { user: req.userId},
                { cards: [...profile.cards, payload.card]})
            res.json(saveCard)
        }catch(error){
            errorHandler(error)
            res.json(error)
            console.log(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async showPurchase(req, res){
        try{
            const userId = mongoose.Types.ObjectId(req.userId)
            const show = await Charges.find({user: userId})
            res.send(show)
        }catch(err){
            errorHandler(error)
            res.status(error)
        }
    },

    async refundReq(req, res){
        try{
            const payload = {
                ...req.body,
                user: req.userId
            }
            const refundReq = await Solicitations.create(payload)
            res.json(refundReq)
        } catch(error){
            errorHandler(error)
            res.status(error.status).send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    }
}