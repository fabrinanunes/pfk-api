const CEP = require("../vendor/correios");

module.exports = {
    async getCEP(cep){
        const postCode = await CEP.postCode(cep);
        return postCode;
    }
};