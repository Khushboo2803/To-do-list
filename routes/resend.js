const express = require('express');
const router = express.Router();

const resendController = require('../controller/resend');
router.use('/', resendController.resend)

module.exports = router;