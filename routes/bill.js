const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill'); // Assuming your Bill model is correctly set up with an ORM like Sequelize or Mongoose
const SeaManagement = require("../models/SeaManagement");


// Endpoint to save a bill
router.post('/', async (req, res) => {
  try {
    const billData = req.body;
    console.log("Bill", billData);


    const newBill = new Bill({
      billNumber: billData.billNumber,
      receiver: billData.receiver,
      goodsDescription: billData.goodsDescription,
      containerNumber: billData.containerNumber,
      weight: billData.weight,
      containerSize: billData.containerSize,
      goodsSize: billData.goodsSize,
      cooling: billData.cooling,
      isShared: billData.isShared,
      shipmentType: billData.shipmentType,
      serviceType: billData.serviceType,
      containerType: billData.containerType,
      billAmount: billData.billAmount,
      shipId: billData.shipId,
      shipName: billData.shipName,
      owner: billData.owner,
      shippingPort: billData.shippingPort,
      totalWeight: billData.totalWeight,
      netWeight: billData.netWeight,
      arrivalDate: billData.arrivalDate,
      captainName: billData.captainName,

      // 🆕 Adding Bayan and Policy Data
      bayanNumber: billData.bayanNumber,
      bayanYear: billData.bayanYear,
      // policyNumber: billData.policyNumber,

      status: billData.status || "Pending Review",
      createdAt: new Date(),
    });
    

    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    console.error('Error saving bill:', err);
    res.status(500).json({ error: 'Failed to save bill.' });
  }
});


router.get('/review', async (req, res) => {
  try {
    const bills = await Bill.find({ status: 'Pending Review' }); // Fetch bills pending review
    res.status(200).json(bills);
  } catch (err) {
    console.error('Error fetching bills:', err);
    res.status(500).json({ error: 'Failed to fetch bills.' });
  }
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const bill = await Bill.findByIdAndUpdate(id, { status }, { new: true });
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }
    res.status(200).json(bill);
  } catch (err) {
    console.error('Error updating bill status:', err);
    res.status(500).json({ error: 'Failed to update bill status.' });
  }
});


router.delete('/bill/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const bill = await Bill.findByIdAndDelete(id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }
    res.status(200).json({ message: 'Bill deleted successfully.' });
  } catch (err) {
    console.error('Error deleting bill:', err);
    res.status(500).json({ error: 'Failed to delete bill.' });
  }
});


router.get('/bills/accepted', async (req, res) => {
  try {
    const bills = await Bill.find({ status: 'Accepted' }); // Fetch accepted bills
    res.status(200).json(bills);
  } catch (err) {
    console.error('Error fetching accepted bills:', err);
    res.status(500).json({ error: 'Failed to fetch accepted bills.' });
  }
});

router.get('/denied', async (req, res) => {
  try {
    const bills = await Bill.find({ status: 'Denied' });
    res.status(200).json(bills);
  } catch (err) {
    console.error('Error fetching denied bills:', err);
    res.status(500).json({ message: 'Failed to fetch denied bills.' });
  }
});

router.get('/accepted', async (req, res) => {
  try {
    const bills = await Bill.find({ status: 'Accepted' });
    res.status(200).json(bills);
  } catch (err) {
    console.error('Error fetching Accepted bills:', err);
    res.status(500).json({ message: 'Failed to fetch Accepted bills.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Bill.findByIdAndDelete(id);
    res.status(200).json({ message: 'Bill deleted successfully.' });
  } catch (err) {
    console.error('Error deleting bill:', err);
    res.status(500).json({ message: 'Failed to delete bill.' });
  }
});

// Get a specific bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bill' });
  }
});

// Update a bill by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json(updatedBill);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update bill' });
  }
});





module.exports = router;
