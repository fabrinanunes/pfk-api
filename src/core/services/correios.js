process.env.NODE_TLS_REJECT_UNAUTHORIZED=0
const soap = require('soap');

module.exports={
    async postCode(data){
        const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';

        const cep = data
        soap.createClient(url, (err, client) => {
            if(err){
                console.log(err)
            }else{
                client.consultaCEP({
                    cep: cep
                }, (err, res) => {
                    console.log(res.return)
                })
            }
        })
    }
}