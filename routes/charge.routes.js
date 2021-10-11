const express = require('express');
const router = express.Router();

const controller = require('../controllers/finances.controller');
const ensureAuthenticated = require('../middlewares/ensure-authenticated');

router.get('/admin/balance', ensureAuthenticated, controller.show);
router.get('/admin/charges', ensureAuthenticated, controller.listCharges);
router.post('/charges', controller.createCharge);
router.get('/charges/:id', ensureAuthenticated, controller.check);
router.put('/charges/cancelation/:id', ensureAuthenticated, controller.cancel);

module.exports = server => server.use('/', router);