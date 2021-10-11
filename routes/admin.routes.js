const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const ensureAuthenticated = require('../middlewares/ensure-authenticated');

router.post('/admin/register', controller.create);
router.post('/admin/login', controller.auth);
router.get('/admin/solicitation', ensureAuthenticated, controller.list);

module.exports = server => server.use('/', router)