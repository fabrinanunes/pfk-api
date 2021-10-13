const express = require('express');
const router = express.Router();

const controller = require('../api/controllers/client.controller');

router.post('/register', controller.singUp);
router.post('/login', controller.signIn);

module.exports = server => server.use('/', router)