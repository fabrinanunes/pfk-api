const CEP = require('../core/services/correios')
const errorHandler = require('../core/erro-handler');

module.exports = {
    async getCEP(req, res){
        try {
            const cep = req.body
            //if (cep.lenght !== 8) throw {error: 'Digite um CEP válido'}
            const getCEP = await CEP.getCEP(cep);
            res.json(getCEP);
        } catch (error) {
            await errorHandler(error)
            res.status(400)
            res.send({'Message': error.error})
        }
    }
}