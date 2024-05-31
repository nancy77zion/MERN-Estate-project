const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utilis/error");
//const jwt = require("jsonwebtoken");


const updateUser = async (req,res,next) => {

  if (req.user.id !== req.params.id)
  return next(errorHandler(401, 'You can only update your own account!'));

try {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, {

    $set: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatarUrl: req.body.avatar
    }
  }, {new: true})

  const {password, ...rest} = updateUser._doc

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    user: rest
  })
  
} catch (error) {
  next(error)
}
}




module.exports = {updateUser}