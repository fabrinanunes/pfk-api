const CEP = require('../core/services/correios')
const { errorHandler } = require('../core/erro-handler')

module.exports = {
    async postCode(req, res){
        try {
            const cep = req.body.cep
            if (cep.length !== 8) throw {error: 'Digite um CEP válido'}
            const CEPController = await CEP.CEPService(cep);
            res.json(CEPController);
        } catch (error) {
            await errorHandler(error)
            res.status(400).send({'Message': error.error})
        }
    }
}