const express = require('express');
const router = express.Router();

const controller = require('../controllers/finances.controller');
const ensureAuthenticated = require('../middlewares/ensure-authenticated')

router.post('/payment', controller.createPayment);
router.post('/payment/capture/:id', ensureAuthenticated, controller.capture);
router.post('/admin/payment/refund/:id', ensureAuthenticated, controller.update);
router.post('/payments/credit-cards/tokenization', ensureAuthenticated, controller.tokenization)
router.post('/payments/refund', ensureAuthenticated, controller.clientReq)

module.exports = server => server.use('/', router)