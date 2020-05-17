const express = require('express');
const router = express.Router();

const verifyController = require('../controller/verify');
router.use('/', verifyController.verify)

module.exports = router;