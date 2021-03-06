const payment = require('../vendor/packJuno');

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

    async list(number){
        const list = await payment.chargeList(number)
        return list;
    },

    async payment(data){
        const newPayment = await payment.payment(data);
        return newPayment
    },

    async refund(data, id){
        const refund = payment.refund(data, id)
        return refund;
    },

    async tokenization(data){
        const saveCard = await payment.tokenization(data)
        return saveCard
    }
}