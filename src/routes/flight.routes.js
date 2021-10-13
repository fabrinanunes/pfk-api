const express = require('express');
const router = express.Router();

const controller = require('../api/controllers/flights.controller');
const ensureAuthenticated = require('../config/middlewares/ensure-authenticated');

router.post('/', ensureAuthenticated, controller.create);
router.get('/', controller.list);

module.exports = server => server.use('/flights', router)