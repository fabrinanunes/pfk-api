const CEP = require("../vendor/correios");

module.exports = {
    async getCEP(cep){
        const postCode = await CEP.postCode(cep);
        return postCode;
    }
};

// process.env.NODE_TLS_REJECT_UNAUTHORIZED=0
// const soap = require('soap');

// module.exports={
//     async postCode(cep){
//         const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';

//         const getCep = await soap.createClient(url);
//         const cepData = await getCep.consultaCEP(cep);

//         return cepData
//     }
// }

// module.exports={
//     postCode(data){
//         const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
//         const cep = data
//         soap.createClientAsync(url, (err, client) => {
//             client.consultaCEP({ cep: cep }, (err, result) => {
//                 if(err) return console.log(err);
//                 console.log('resposta', result.return)
//                 return result
//                 })
//             }) 
//     }
// }

// (async () => {
//     const axios = require('axios');
//     const url = "http://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";
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