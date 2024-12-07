// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const config = require('../config/database');

// Register
router.post('/register', async (req, res) => {
  console.log("register route");
  
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    return res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error in register' });
  }
});


// Login
// Login route in auth.js
router.post('/login', async (req, res) => {
  console.log("login route");
  const username = req.body.username;
  const password = req.body.password;

  try {
    let user = await User.getUserByUsername(username);
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    let isMatch = await User.comparePassword(password, user.password);
    console.log("isMatch: ", isMatch);
    if (isMatch) {
      const token = jwt.sign({ data: user }, config.secret, {
        expiresIn: 604800 // 1 week
      });

      res.json({
        success: true,
        token: `Bearer ${token}`,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      return res.json({ success: false, msg: 'Wrong password' });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, msg: 'Server error during login' });
  }
});


module.exports = router;
