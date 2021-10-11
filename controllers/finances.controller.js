const payment = require('../lib/payment/packJuno')
const Solicitations = require('../models/solicitations');
const moment = require('moment')

module.exports = {
    //consultar saldo
    async show(req, res){
        try{
            const balance = await payment.balance();
            return res.json(balance.balance)
        }catch(err){
            console.error(err)
            return res.json(err)
        }
    },
        
    //criar cobrança
    async createCharge(req, res){
        try {
            const charge = req.body;
            const newCharge = await payment.charge(charge);
            res.json(newCharge)
        }catch(err){            
            // const chargeDate = moment(req.body.charge.dueDate);
            // const now = moment().format('YYYY-MM-DD');
            const status = err.status ? err.status : 400
            res.status(status).send(err)
            return
        }
    },

    //consultar cobrança
    async check(req, res){
        try {
            const id = req.params.id  
            const charge = await payment.checkCharge(id);
            return res.json(charge)
        } catch (err) {
            const status = err.status ? err.status : 400
            res.status(status).send(err)
        }
    },

    //listar cobrança
    async listCharges(req, res){
        try {
            const list = await payment.chargeList();
            return res.json(list)
        } catch (error) {
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }
    },

    //cancelar cobrança
    async cancel(req, res){
        try {
            const id = req.params.id
            const chargeCancellation = await payment.cancel(id);
            return res.json(chargeCancellation)
        } catch (error) {
            const status = error.status ? error.status : 400
            res.status(status).send(error)   
        }
    },

    //criar pagamento
    async createPayment(req, res){
        try{
            const data = req.body;
            const newPayment = await payment.payment(data);
            return res.json(newPayment)
        }catch(err){
            const status = err.status ? err.status : 400
            res.status(status).send(err)
            return
        }
    },

    //capturar pagamento
    async capture(req, res){
        try{
            const id = req.params.id
            const obj = req.body
            const capturePayment = await payment.capture(id, obj);
            return res.json(capturePayment)
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }
    },

    //reembolso
    async update(req, res){
        try {
            const id = req.params.id;
            const obj = req.body.amount;
            const refund = await payment.refund(id, obj);
            return res.json(refund)
        } catch (error) {
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }    
    },

    //tokenizar cartão
    async tokenization(req,res){
        try {
            const hash = req.body.creditCardHash;
            const saveCard = await payment.tokenization(hash);
            return res.json(saveCard)
        } catch (err) {
            const status = err.status ? err.status : 400
            res.status(status).send(err)
            return
        }
    },

    //solicitação de reembolso
    async clientReq(req, res){
        const { payId } = req.body;

        try{
            //if(await Solicitations.findOne({ payId })) 
            //return res.status(400).send({ error: 'This solicitation already exists' });

            const refundReq = await Solicitations.create(req.body)
            res.send({ refundReq })
        } catch(err){
            res.status(400).send({ error: 'Solicitation failed'})
        }
        

    }
}