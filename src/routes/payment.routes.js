const express = require('express');
const router = express.Router();

const controller = require('../controllers/finances.controller');
const ensureAuthenticated = require('../config/middlewares/ensure-authenticated');

router.post('/payment', controller.payment);
router.post('/admin/payment/refund/:id', ensureAuthenticated, controller.refund);
router.post('/payments/credit-cards/tokenization', ensureAuthenticated, controller.tokenization)
router.post('/payments/refund', ensureAuthenticated, controller.refundReq)

module.exports = server => server.use('/', router)