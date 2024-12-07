const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const SeaManagement = require('../models/SeaManagement');


router.get('/handling_management', auth, (req, res) => {
  if (req.user.role !== 'handling_management') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Welcome to the Handling Management dashboard' });
});

router.get('/reviewer', auth, (req, res) => {
  if (req.user.role !== 'reviewer') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Welcome to the Reviewer dashboard' });
});

router.get('/finance', auth, (req, res) => {
  if (req.user.role !== 'finance') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Welcome to the Finance dashboard' });
});

router.get('/hr', auth, (req, res) => {
  if (req.user.role !== 'hr') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Welcome to the HR dashboard' });
});

router.get('/admin', auth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Welcome to the Admin dashboard' });
});

module.exports = router;
