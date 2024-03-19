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
    //res.status(500).json(error.message);    instead of this use the below
    //middleware from index.js
    next(error);
  }
};

//function for sign-in page

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email }); //find user in the model(DB)
    if (!validUser) return next(errorHandler(404, "user not found!")); //using the error handler from utils
    const validPassword = bcrypt.compareSync(password, validUser.password); //compare the password from the user and the password in the database
    if (!validPassword) return next(errorHandler(401, "password incorrect!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // using the user_id field to generate token and authenticate the user using cookies
    const { password: pass, ...restInfo } = validUser._doc; //remove the password before sending the res
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(restInfo);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res) => {
  try {
    const googleUser = await User.findOne({ email: req.body.email });
    if (googleUser) {
      const token = jwt.sign({ id: googleUser._id }, process.env.JWT_SECRET);                                                                           
      const { password: pass, ...rest } = googleUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // if the user is not found generate a password for the user and create
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error){
    next(error);
  }
};

module.exports = { signup, signin, google };
