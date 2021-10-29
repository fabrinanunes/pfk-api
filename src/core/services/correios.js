const CEP = require("../vendor/correios");

module.exports = {
    async CEPService(cep){
        const CEPService = await CEP.postCode(cep);
        return CEPService;
    }
};