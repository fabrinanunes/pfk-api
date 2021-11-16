const axios = require('axios');
require('dotenv').config();

const enviroments = {
    baseURLAuth: process.env.JUNO_BASE_URL_AUTH,
    baseURL: process.env.JUNO_BASE_URL,
    path: 'oauth/token',
    id: process.env.JUNO_ID,
    secret: process.env.JUNO_SECRET,
    resourceToken: process.env.JUNO_RESOURCE_TOKEN
};

const paymentPack = {

    initAuth: async() => {
        const encoded = Buffer.from(`${enviroments.id}:${enviroments.secret}`).toString('base64');
        const instance = axios.create({
            baseURL: enviroments.baseURLAuth,
            headers: {
                'Authorization': `Basic ${encoded}`
            }
        });
        return instance;
    },

    init: async() => {
        const token = await paymentPack.getToken()
        const instance = axios.create({
            baseURL: enviroments.baseURL,
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Api-Version': '2',
                'X-Resource-Token': enviroments.resourceToken,
                'Content-type': 'application/json'
            }
        });

        return instance;
    }, 

    getToken: async() => {
        try{
        const instance = await paymentPack.initAuth();

        let params = new URLSearchParams();
        params.append('grant_type','client_credentials');
        
        const res = await instance.post(enviroments.path, params);

        return res.data.access_token;
        }catch(err){
            throw err
        }
    },

    balance: async() => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.get('balance');
            return res.data
        }catch(err){
            throw err;
        }
    },

    tokenization: async(obj) => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.post('/credit-cards/tokenization', obj);
            return res.data;
        }catch(err){
            throw err.response;
        }
    },

   //cobrança
    charge: async(obj) => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.post('charges', obj);
            return res.data._embedded.charges;
        }catch(err){
            throw err.response.data;
        }
    },
    
    cancel: async(id, obj) => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.put(`charges/${id}/cancelation`, obj)
            return res.statusText;
        }catch(err){
            throw err.response.data;
        }
    },

    checkCharge: async(id, obj) => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.get(`charges/${id}`, obj)
            return res.data
        }catch(err){
            throw err.response.data;
        }
    },

    chargeList: async(number) => {
        try{
            const intance = await paymentPack.init();
            const res = await intance.get(`charges?page=${number}`);
            return res.data._embedded.charges
        }catch(err){
            throw err.response.data;
        }
    },

    //pagamento
    payment: async(obj) => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.post('payments', obj);
 
            return res.data.payments[0];
        }catch(err){
            throw err.response.data
        }
    },

    capture: async(id, obj) => {
        try{
            const instance = await paymentPack.init();
            const res = await instance.post(`payments/${id}/capture`, obj);
            return res.data
        }catch(err){
            throw err.response.data;
        }
    },

    refund: async(id, amount = null) => {
        try{
            const obj = {
                amount
            };
            const instance = await paymentPack.init();
            const res = await instance.post(`payments/${id}/refunds`, obj)
            return res.data;
        }catch(err){
            throw err.response.data;
        }
    }
}

module.exports = paymentPack;