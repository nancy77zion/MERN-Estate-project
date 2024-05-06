const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utilis/error");
const jwt = require("jsonwebtoken");


const updateUser = (req,res,next) => {
  if (req.user.id !== req.params.id)
  return next(errorHandler(401, 'You can only update your own account!'));
try {
  
} catch (error) {
  next(error)
}
}




module.exports = {updateUser}