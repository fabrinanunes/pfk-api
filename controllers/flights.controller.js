const Flight = require('../models/flight-schedules');

module.exports = {
    async create(req, res){
        try {
            const flightSchedule = await Flight.create(req.body)
            res.send({ flightSchedule })
        } catch (error) {
            res.status(400).send({ error: 'The flight was not included on the list'})
        }
    },

    async list(req, res){
        try {
            const listReq = await Flight.find()
            res.send(listReq)
        } catch (error) {
            res.status(400).send({ error: 'The list can not be accessed'})
        }
    }
}