const axios = require('axios');
const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({attributeMode:false});

const postCode = {
  async postCode(obj){
    const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
    const req =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                    <soapenv:Header />
                      <soapenv:Body>
                        <consultaCEP xmlns="http://cliente.bean.master.sigep.bsb.correios.com.br/">
                          <cep xmlns="">${obj}</cep>
                        </consultaCEP>
                      </soapenv:Body>
                    </soapenv:Envelope>`;
    const { data } = await axios.post(url, req,  {
      headers: {
        "Content-type": "text/xml;charset=utf-8",
      }})
    const res = parser.xmlToJson(data, (error, json) => {
      if (error) return error
      return json
    })
    return res['soap:Envelope']['soap:Body']['ns2:consultaCEPResponse'].return;
  }
}

module.exports = postCode