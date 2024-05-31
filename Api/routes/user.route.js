const express = require('express');
const {updateUser}  = require('../controllers/user.controller.js');
const verifyToken = require('../utilis/verifyUser.js');

const router = express.Router();

router.put('/update/:id', verifyToken ,updateUser)

module.exports = router;