const postCode = require("../vendor/correios");

module.exports = {
    async CEPService(cep){
        const CEPService = await postCode.postCode(cep);
        return CEPService;
    }
};