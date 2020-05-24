const express = require('express');
const router = express.Router();

const passwordController = require('../controller/login');
router.post('/forgot', passwordController.forgotPassword);
router.post('/update', passwordController.updatePassword);
router.use('*', passwordController.notfound);
module.exports = router;