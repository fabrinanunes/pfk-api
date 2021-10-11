const express = require('express');
const router = express.Router();

const controller = require('../controllers/client.controller');

router.post('/register', controller.create);
router.post('/login', controller.auth);

module.exports = server => server.use('/', router)