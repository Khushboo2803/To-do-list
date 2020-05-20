const express = require('express');
const router = express.Router();

const verifyController = require('../controller/verify');
router.post('/', verifyController.verify)
router.use('*', verifyController.notfound);
module.exports = router;