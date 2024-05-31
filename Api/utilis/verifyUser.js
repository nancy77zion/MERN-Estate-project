const  jwt = require('jsonwebtoken');
const errorHandler = require('./error');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // get the token in the cookie

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // verify the token
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;  // save the user object inn the request
    next(); // go the updateUser
  });
};

module.exports = verifyToken

