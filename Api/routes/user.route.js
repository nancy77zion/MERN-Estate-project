const express = require('express');
const {userCon}  = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/user', userCon)

module.exports = router;