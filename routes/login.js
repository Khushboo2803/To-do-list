const express = require('express');
const router = express.Router();

const loginController = require('../controller/login');
router.post('/', loginController.login);
router.use('*', loginController.notfound);
module.exports = router;