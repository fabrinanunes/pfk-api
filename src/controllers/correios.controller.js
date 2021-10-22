const CEP = require('../core/services/correios')

module.exports = {
    async getCEP(req, res){
        try {
            const cep = req.body
            const getCEP = await CEP.getCEP(cep);
            res.json(getCEP);
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    }
}