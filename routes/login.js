const express = require('express');
const router = express.Router();

const loginController = require('../controller/login');
router.use('/', loginController.login);

module.exports = router;