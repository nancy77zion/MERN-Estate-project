const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utilis/error");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword }); //import the model above

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    //res.status(500).json(error.message);
    next(error);
  }
};
 
//function for sign-in page

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email }); //find user in the model(DB)
    if (!validUser) return next(errorHandler(404, "user not found!"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "password incorrect!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); //to authenticate the user using cookies
    const {password: pass, ...restInfo} = validUser._doc
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restInfo);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
