// routes/sea-management.js
const express = require('express');
const router = express.Router();
const Ship = require('../models/Ship');

// Add or update the policy of a specific ship
router.post('/add-policy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const policyData = req.body;

    const updatedShip = await Ship.findByIdAndUpdate(
      id,
      { policy: policyData }, // Set the policy field
      { new: true } // Return the updated document
    );

    if (!updatedShip) {
      return res.status(404).json({ error: 'Ship not found' });
    }

    res.status(200).json(updatedShip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get the policy of a specific ship
router.get('/policy-details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const ship = await Ship.findById(id, 'policy'); // Retrieve only the policy field

    if (!ship) {
      return res.status(404).json({ error: 'Ship not found' });
    }

    res.status(200).json(ship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
