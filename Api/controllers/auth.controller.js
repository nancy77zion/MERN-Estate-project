const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
  const {username,email,password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = new User({username, email, password: hashedPassword}); //import the model above

  try {
    await newUser.save();
    res.status(201).json('user created successfully') 
  } catch (error) {
    res.status(500).json(error.message);
  }
  
};

module.exports = {signup}