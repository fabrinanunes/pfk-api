const express = require('express');
const router = express.Router();

const controller = require('../api/controllers/finances.controller');
const ensureAuthenticated = require('../config/middlewares/ensure-authenticated');

router.get('/admin/balance', ensureAuthenticated, controller.balance);
router.get('/admin/charges', ensureAuthenticated, controller.list);
router.post('/charges', controller.newCharge);
router.get('/charges/:id', ensureAuthenticated, controller.status);

module.exports = server => server.use('/', router);