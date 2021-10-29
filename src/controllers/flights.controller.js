const Flight = require('../models/flight-schedules');
const errorHandler = require('../core/erro-handler');

module.exports = {
    //criar as mensagens????
    async create(req, res){
        try {
            const numberFlight = req.body.flight;     
           //if(await Flight.find({ numberFlight })) throw { error: 'This flight already exists' };                       
            const flightSchedule = await Flight.create(req.body)
            res.send({ flightSchedule })
        } catch (error) {
            await errorHandler(error)
            res.status(400).send({'Message': error.error})
        }
    },

    async list(req, res){
        try {
            const listReq = await Flight.find()
            res.send(listReq)
        } catch (error) {
            await errorHandler(error)
            res.status(400).send({'Message': error.error})
        }
    }
}