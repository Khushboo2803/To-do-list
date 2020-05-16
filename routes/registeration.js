const express = require('express');
const router = express.Router();

const registerController = require('../controller/registeration');
router.use('/', registerController.register)

module.exports = router;