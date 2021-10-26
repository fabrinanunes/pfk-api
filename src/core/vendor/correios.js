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

// const postCode = {
//   postCode: (async (cep) => {
//     const axios = require('axios');
//     const url = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl"
//     const request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
//                         <soapenv:Header />
//                         <soapenv:Body>
//                             <consultaCEP xmlns="http://cliente.bean.master.sigep.bsb.correios.com.br/">
//                                 <cep xmlns="">${cep}</cep>
//                             </consultaCEP>
//                         </soapenv:Body>
//                     </soapenv:Envelope>`;
//         const config = {
//             method: "POST",
//             data: request,
//             url
//         }
//     const response = await axios(config);
//     console.log(response.data)
//   })()
// }

// module.exports = postCode