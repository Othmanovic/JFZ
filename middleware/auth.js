// middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config/database'); // Make sure you have the correct path

module.exports = function(req, res, next) {
  const authHeader = req.header('Authorization'); // Use 'Authorization' instead
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token format is invalid' });
  }

  // Extract token from 'Bearer <token>' format
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.data._id; // Or use `decoded.id` if `id` is used in the payload
    next();
  });
};
