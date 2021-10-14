const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const ensureAuthenticated = require('../config/middlewares/ensure-authenticated');

router.post('/admin/register', controller.singUp);
router.post('/admin/login', controller.signIn);
router.get('/admin/solicitation', ensureAuthenticated, controller.solicitations);

module.exports = server => server.use('/', router)