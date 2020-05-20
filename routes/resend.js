const express = require('express');
const router = express.Router();

const resendController = require('../controller/resend');
router.post('/', resendController.resend)
router.use('*', resendController.notfound);
module.exports = router;