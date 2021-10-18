// process.env.NODE_TLS_REJECT_UNAUTHORIZED=0
const moment = require('moment');

const payment = require('../vendor/packJuno');
const Cards = require('../../models/cards');
const Charges = require('../../models/charges');
const Client = require('../../models/client');
const Profile = require('../../models/profile')

module.exports={
    async balance(){
        const balance = await payment.balance();
        return balance;
    },

    async charge(data){
        const charge = await payment.charge(data);
        return charge;
    },

    async status(data, id){
        const check = await payment.checkCharge(data, id);
        return check;
    },

    async list(){
        const list = await payment.chargeList()
        return list;
    },

    async payment(data){
        const user = await Profile.findOne({user: _id})
        const newPayment = await payment.payment(data);
        const paymentData = {
            user: user,
            paymentId: newPayment.id,
            chargeId: newPayment.chargeId,
            card: newPayment.creditCardDetails.creditCardId
        }
        console.log(paymentData)
        const paymentDb = await Charges.create(paymentData)
        return [newPayment, paymentData]
    },

    async refund(data, id){
        const refund = payment.refund(data, id)
        return refund;
    },

    async tokenization(data){
        const saveCard = await payment.tokenization(data)
        const cardData = {
            card: saveCard.creditCardId,
            last4CardNumber: saveCard.last4CardNumber,
            expirationMonth: saveCard.expirationMonth,
            expirationYear: saveCard.expirationYear
        }
        const card = await Cards.findOne({card: cardData.card})
        if(card == null){
            await Cards.create(cardData)
        }
        //Profile: adicionar o cartão no array
        return saveCard
    }
}