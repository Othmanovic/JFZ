// routes/sea-management.js
const express = require('express');
const router = express.Router();
const Ship = require('../models/Ship');
const Price = require('../models/Prices');
const Policy = require('../models/Policy');

// Add a policy for a specific ship
router.post('/add-policy/:shipId', async (req, res) => {
  try {
    const { shipId } = req.params;
    const policyData = req.body;

    // Create a new Policy document
    const newPolicy = new Policy({
      ...policyData,
      ship: shipId, // Associate the policy with the ship
    });

    // Save the policy to the database
    const savedPolicy = await newPolicy.save();

    // Return the saved policy
    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/policy-details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find policies directly by ship ID
    const policies = await Policy.find({ ship: id });

    if (!policies || policies.length === 0) {
      return res.status(404).json({ error: 'No policies found for this ship' });
    }

    res.status(200).json({ policies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/policy/:id', async (req, res) => {
  try {
    const policyId = req.params.id;
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.status(200).json(policy); // Send the policy data as JSON
  } catch (error) {
    console.error('Error fetching policy:', error);
    res.status(500).json({ message: 'Error fetching policy' });
  }
});


// Update a policy by ID
router.put('/policies/:id', async (req, res) => {
  try {
    const policyId = req.params.id;
    const updatedPolicy = req.body;

    // Find the policy by ID and update it
    const result = await Policy.findByIdAndUpdate(policyId, updatedPolicy, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating policy:', error);
    res.status(500).json({ message: 'Error updating policy' });
  }
});


router.post('/prices', async (req, res) => {
  try {
    const { shipmentType, containerType, containerSize, pricePerContainer, calculationMethod, volume } = req.body;

    const newPrice = new Price({
      shipmentType,
      containerType,
      containerSize,
      pricePerContainer,
      calculationMethod,
      volume: calculationMethod === 'volume' ? volume : 0,
    });

    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (error) {
    console.error('Error saving price:', error);
    res.status(500).json({ error: 'Failed to save price' });
  }
});

router.get('/price', async (req, res) => {
  const { shipmentType, containerSize, containerType } = req.query;

  try {
    const price = await Price.findOne({
      shipmentType,
      containerSize: parseFloat(containerSize),
      containerType,
    });

    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    res.status(200).json(price);
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
