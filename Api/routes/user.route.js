const express = require('express');
const {updateUser}  = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/update/:id', updateUser)

module.exports = router;