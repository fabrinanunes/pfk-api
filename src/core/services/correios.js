const CEP = require("../vendor/correios");

module.exports = {
    async getCEP(cep){
        const postCode = await CEP.postCode(cep);
        return postCode;
    }
};

// (async () => {
//     const axios = require('axios');
//     const url = "http://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente";
//     const request = `<soapenv:Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
//                         <soapenv:Header />
//                         <soapenv:Body>
//                             <consultaCEP xmlns="http://cliente.bean.master.sigep.bsb.correios.com.br/">
//                                 <cep>'88032249'</cep>
//                             </consultaCEP>
//                         </soapenv:Body>
//                     </soapenv:Envelope>`;
//     const config = {
//         method: "POST",
//         data: request,
//         url
//     };
//     const response = await axios(config);
//     console.log(response)
// })();