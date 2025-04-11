const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'sea_management', 'handling_management', 'reviewer', 'e3dad', 'bayan', 'finance', 'hr'],
    required: true,
  },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = async function (username) {
  try {
    const query = { username: username };
    const user = await User.findOne(query);
    console.log("user", user);
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports.comparePassword = async function (candidatePassword, hash) {
  try {
    let ismatch = await bcrypt.compare(candidatePassword, hash);
    return ismatch;
  } catch (error) {
    throw error;
  }
}
