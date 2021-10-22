const Flight = require('../models/flight-schedules');
const errorHandler = require('../core/erro-handler');

module.exports = {
    //criar as mensagens????
    async create(req, res){
        try {
            const numberFlight = req.body.flight;                            
            const flightSchedule = await Flight.create(req.body)
            res.send({ flightSchedule })
        } catch (error) {
            errorHandler(error)
            res.status(error.status)
            res.send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    },

    async list(req, res){
        try {
            const listReq = await Flight.find()
            res.send(listReq)
        } catch (error) {
            errorHandler(error)
            res.status(error.status)
            res.send([{'Status': error.status, 'Error': error.error, 'Message': error.details[0].message}])
        }
    }
}