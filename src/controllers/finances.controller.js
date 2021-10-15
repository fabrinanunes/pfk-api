process.env.NODE_TLS_REJECT_UNAUTHORIZED
const Solicitations = require('../models/solicitations');

const finances = require('../core/services/finances')
const { postCode } = require('../core/services/correios')

module.exports = {
    async balance(req, res){
        try{
            const list = await finances.balance()
            res.json(list.balance)
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
            return
        }
    },

    async charge(req, res){
        try {
            const cep = req.body.billing.address.postCode;
            const charge = await finances.charge(req.body);
            const getCep = await postCode(cep);
            res.json(charge)
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }
    },

    async status(req, res){
        try{
            const id = req.params.id;
            const charge = await finances.status(id);
            return res.json(charge)
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }
    },

    async list(req, res){
        try {
            const list = await finances.list()
            return res.json(list)
        } catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }
    },

    async payment(req, res){
        try{
            const payment = await finances.payment(req.body);
            return res.json(payment);
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
            return
        }
    },

    async refund(req, res){
        try{
            const id = req.params.id;
            const refund = await finances.refund(id, req.body.amount)
            res.json(refund)
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
        }
    },

    async tokenization(req, res){
        try{
            const saveCard = await finances.tokenization(req.body.creditCardHash);
            res.json(saveCard)
        }catch(error){
            const status = error.status ? error.status : 400
            res.status(status).send(error)
            return
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
            console.log(error)
            res.status(400).send({ error: 'Solicitation failed'})
        }
    }
}