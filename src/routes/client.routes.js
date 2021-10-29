const express = require('express');
const router = express.Router();

const controller = require('../controllers/client.controller');
const ensureAuthenticated = require('../config/middlewares/ensure-authenticated');

router.post('/register', controller.singUp);
router.post('/login', controller.signIn);
router.get('/my-cards', ensureAuthenticated, controller.showCards);
router.get('/profile', ensureAuthenticated, controller.profile); //can not get (api dev)

module.exports = server => server.use('/', router)