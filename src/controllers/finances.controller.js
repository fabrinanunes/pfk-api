const mongoose = require('mongoose');
const Solicitations = require('../models/solicitations');
const Charges = require('../models/charges');
const Profile = require('../models/profile');
const Cards = require('../models/cards');
const Client = require('../models/client');

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

    async charge(req, res){
        try {
            const charge = await finances.charge(req.body);
            const userId = req.userId;
            const flight = req.body.charge.description;
            const chargeId = charge[0].id;
            
            const purchase = await Charges.create({flight: flight, chargeId: chargeId, user: userId});
            const user = await Client.findById(userId);
            const profile = await Profile.findOne({ user: userId });
            const addFlight = await Profile.updateOne(
                {user: req.userId}, 
                {flights: [...profile.flights, chargeId]})

            res.json(charge[0])
        }catch(error){
            errorHandler(error)
            res.status(error.status).send({'Status': error.status, 'Error': error.error, 'Message': error.details[0].message})
        }
    },

    async status(req, res){
        try{
            const id = req.params.id;
            const charge = await finances.status(id);
            return res.json(charge)
        }catch(error){
            errorHandler(error)
            res.status(error.status).send({'Status': error.status, 'Error': error.error, 'Message': error.details[0].message})
        }
    },

    async list(req, res){
        try {
            const page = req.query.page
            const list = await finances.list(page)
            return res.json(list)
        } catch(error){
            errorHandler(error)
            res.status(error.status).send({'Status': error.status, 'Error': error.error, 'Message': error.details[0].message})
        }
    },

    async payment(req, res){
        try{
            const payment = await finances.payment(req.body);
            const paymentData = {
                paymentId: payment.id,
                card: req.body.creditCardDetails.creditCardId,
                amount: payment.amount
            }
            const email = req.body.billing.email;
            const paymentMail = payment.id
            mailer.purchase(email, paymentMail);
            const charge= await Charges.findOne({ chargeId: req.body.chargeId })
            const updateCharge = await Charges.updateOne(
                {chargeId: charge.chargeId}, {paymentId: paymentData.paymentId, card: paymentData.card, amount: paymentData.amount})
            return res.json(payment);
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
            const charge = await Charges.findOne({ user: payload.user });
            const addCard = await Charges.updateOne(
                {user: req.userId}, 
                {card: payload.card})

            const profile = await Profile.findOne({ user: req.userId })
            const profileUpdate = await Profile.updateOne(
                { user: req.userId},
                { cards: [...profile.cards, payload.card]})
            res.json(saveCard)
        }catch(error){
            errorHandler(error)
            res.status(error.status).send({'Status': error.status, 'Error': error.error, 'Message': error.details[0].message})
        }
    },

    async refundReq(req, res){
        try{
            const user = await Client.findById({_id: req.userId})
            const payload = {
                ...req.body,
                user: req.userId,
                name: user.name,
                email: user.email
            }
            if(await Solicitations.findOne({ paymentId: req.body.paymentId })) throw { error: 'You already request a refund for this payment' };
            const refundReq = await Solicitations.create(payload)
            res.json(refundReq)
        } catch(error){
            errorHandler(error)
            res.status(400).send({'Status': 400, 'Error': 'Bad Request', 'Message': error.error})
        }
    },

    async refund(req, res){
        try{
            const id = req.params.id;
            const refund = await finances.refund(id, req.body.amount)
            const user = await Solicitations.find({ paymentId: id })
            mailer.refund(user[0].email, user[0].name)
            res.json(refund)
        }catch(error){
            errorHandler(error)
            res.status(error.status).send({'Status': error.status, 'Error': error.error, 'Message': error.details[0].message})
        }
    }
}