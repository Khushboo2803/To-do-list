const express = require('express');
const router = express.Router();

const registerController = require('../controller/registeration');
router.post('/', registerController.register)
router.use('*', registerController.notfound);
module.exports = router; 