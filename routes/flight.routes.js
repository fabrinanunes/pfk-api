const express = require('express');
const router = express.Router();

const controller = require('../controllers/flights.controller');
const ensureAuthenticated = require('../middlewares/ensure-authenticated');

router.post('/', ensureAuthenticated, controller.create);
router.get('/', controller.list);

module.exports = server => server.use('/flights', router)