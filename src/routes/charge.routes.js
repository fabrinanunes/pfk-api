const express = require('express');
const router = express.Router();

const controller = require('../controllers/finances.controller');
const postCodeController = require('../controllers/correios.controller')
const ensureAuthenticated = require('../config/middlewares/ensure-authenticated');

router.get('/admin/balance', ensureAuthenticated, controller.balance);
router.get('/admin/charges', ensureAuthenticated, controller.list);
router.post('/charges', ensureAuthenticated, controller.charge);
router.get('/charges/:id', ensureAuthenticated, controller.status);
router.post('/postcode', postCodeController.postCode);

module.exports = server => server.use('/', router);