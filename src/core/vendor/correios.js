const soap = require("soap");
require("dotenv").config();

module.exports = {
  async postCode(cep) {
    const url = 'http://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
    const correios = await soap.createClientAsync(url);
    const zipCode = await correios.consultaCEPAsync(cep);
    console.log('getCep', zipCode);
    return zipCode[0].return
  }
};