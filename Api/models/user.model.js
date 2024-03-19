const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
    unique: true,
  },
  avatar: {
    type: 'string',
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  },
}, {timestamps: true});

const UserM = mongoose.model('User', userSchema)

module.exports = UserM;