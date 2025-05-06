const express = require('express');
const router = express.Router();
const Ship = require('../models/Ship');
const SeaManagement = require('../models/SeaManagement');
const Policy = require('../models/Policy');
const Wakeel = require('../models/Wakeel');
const authMiddleware = require('../middleware/auth');
const SeaFee = require('../models/SeaFees');
const Voucher = require('../models/Voucher');
const ProtectionNet = require('../models/ProtectionNet'); // create this model


router.post('/', authMiddleware, async (req, res, next) => {
  let seaManagement = new SeaManagement({
    shipId : req.body.shipId,
    shipName: req.body.shipName,
    owner: req.body.owner,
    // agent: req.body.agent,
    flag: req.body.flag,
    wakeel: req.body.wakeel,
    callSign: req.body.callSign,
    totalWeight: req.body.totalWeight,
    netWeight: req.body.netWeight,
    maxDive: req.body.maxDive,  
    crewNumber: req.body.crewNumber,
    crewNationality: req.body.crewNationality,
    shipmentType: req.body.shipmentType,
    shippingPort: req.body.shippingPort,
    comingFrom: req.body.comingFrom,
    travelingTo: req.body.travelingTo,
    shipmentDetails: req.body.shipmentDetails,
    shipmentWeight: req.body.shipmentWeight,
    transitShipment: req.body.transitShipment,
    arrivalDate: req.body.arrivalDate,
    captainName: req.body.captainName,
    notes: req.body.notes
  });

  try {
    await seaManagement.save();
    
    res.status(201).json({ success: true, message: 'Sea Management saved successfully' });
  } catch (err) {
    console.error('Error saving Sea Management data:', err); // ⬅️ Add this
    res.status(500).json({ success: false, message: 'Error saving Sea Management data' });
  }
});


// Get all ship arrivals
// router.get('/ship-arrivals-history', authMiddleware, async (req, res) => {
//   try {
//     const shipArrivals = await Ship.find(); // Fetch all records
//     res.json(shipArrivals);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching ship arrivals', error: err });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const seaManagementData = await SeaManagement.find();
    res.status(200).json(seaManagementData);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching Sea Management data' });
  }
});

// Route to get ship arrival details by ID
router.get('/ship-arrival-details/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const shipArrival = await SeaManagement.findById(id);

    if (!shipArrival) {
      return res.status(404).json({ success: false, message: 'Ship arrival not found' });
    }

    res.json({ success: true, data: shipArrival });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.post('/add-ship', authMiddleware, async (req, res) => {
  const { shipName, captainName, owner, flag, maxDive, bayanNumber } = req.body;

  try {
    const newShip = new Ship({
      shipName,
      captainName,
      owner,
      flag,
      maxDive,
      bayanNumber
    });

    await newShip.save();
    res.status(201).json({ success: true, message: 'Ship added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding ship' });
  }
});

router.get('/ships', authMiddleware, async (req, res) => {
  try {
    const ships = await Ship.find();
    res.json(ships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/ships/:id/generate-number', async (req, res) => {
  try {
    const shipId = req.params.id;

    // Check if the ship already has a number
    const ship = await Ship.findById(shipId);
    if (!ship) {
      return res.status(404).send({ error: 'Ship not found' });
    }

    if (ship.shipNumber) {
      return res.status(400).send({ error: 'Ship already has a number' });
    }

    // Generate a unique ship number (starting from A1000)
    const generatedNumber = 'A' + (Math.floor(Math.random() * 9000) + 1000);

    // Update the ship with the generated number
    ship.shipNumber = generatedNumber;
    const updatedShip = await ship.save();

    res.status(200).send(updatedShip);
  } catch (error) {
    console.error('Error generating ship number:', error);
    res.status(500).send({ error: 'Error generating ship number' });
  }
});

// Get policies for a specific seaManagement entry
router.get('/sea-management/:id/policies', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find seaManagement entry and populate policies
    const seaManagement = await SeaManagement.findById(id).populate('policies');

    if (!seaManagement) {
      return res.status(404).json({ message: 'Sea Management entry not found' });
    }

    res.status(200).json(seaManagement.policies);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ message: 'Error fetching policies' });
  }
});


router.put('/update-ship', authMiddleware, async (req, res) => {
  const { _id, startWorkingDate } = req.body;

  try {
    const ship = await Ship.findById(_id);
    if (!ship) {
      return res.status(404).json({ success: false, message: 'Ship not found' });
    }

    ship.startWorkingDate = startWorkingDate;
    await ship.save();

    res.status(200).json({ success: true, message: 'Start working date updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating ship' });
  }
});

// Update Sea Management record
router.put('startDate/:id', async (req, res) => {
  try {
    const updatedRecord = await SeaManagement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error('Error updating sea management record:', err);
    res.status(500).json({ message: 'Error updating record' });
  }
});

// Endpoint for bayan user to assign/update a bayan number for a ship
router.post('/bayan/:id', async (req, res) => {
  const seaManagementId = req.params.id;
  try {
    const currentYear = new Date().getFullYear();
    const seaManagement = await SeaManagement.findById(seaManagementId);

    if (!seaManagement) {
      return res.status(404).json({ message: 'Sea Management record not found' });
    }

    // If it's a new year, restart bayan number from 1
    if (seaManagement.bayanYear !== currentYear) {
      seaManagement.bayanNumber = 1;
      seaManagement.bayanYear = currentYear;
    } else {
      // Find the highest bayan number for the current year
      const maxSeaManagement = await SeaManagement.find({ bayanYear: currentYear })
        .sort({ bayanNumber: -1 })
        .limit(1);

      const nextNumber = (maxSeaManagement.length > 0 && maxSeaManagement[0].bayanNumber)
        ? maxSeaManagement[0].bayanNumber + 1
        : 1;

      seaManagement.bayanNumber = nextNumber;
      seaManagement.bayanYear = currentYear;
    }

    await seaManagement.save();
    res.status(200).json(seaManagement);
  } catch (error) {
    console.error('Error assigning Bayan number:', error);
    res.status(500).json({ error: 'Error assigning Bayan number' });
  }
});


// Fetch SeaManagement by shipId
router.get('/ship/:shipId', async (req, res) => {
  try {
    const { shipId } = req.params;

    // ✅ Ensure we're querying by `shipId`, not `_id`
    const seaManagementData = await SeaManagement.findOne({ shipId: shipId });

    if (!seaManagementData) {
      return res.status(404).json({ message: 'SeaManagement record not found' });
    }

    res.status(200).json(seaManagementData);
  } catch (error) {
    console.error('❌ Error fetching Sea Management:', error);
    res.status(500).json({ message: 'Server error retrieving SeaManagement data' });
  }
});

router.post('/wakeel', async (req, res) => {
  try {
    const wakeel = new Wakeel(req.body);
    await wakeel.save();
    res.status(201).json(wakeel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating wakeel' });
  }
});



router.post('/wakeel/:id/top-up', async (req, res) => {
  const { amount } = req.body;
  try {
    const wakeel = await Wakeel.findById(req.params.id);
    if (!wakeel) return res.status(404).json({ message: 'Wakeel not found' });

    wakeel.balance += amount;
    wakeel.transactions.push({
      type: 'top-up',
      amount,
      description: 'Cash top-up',
    });

    await wakeel.save();
    res.status(200).json(wakeel);
  } catch (error) {
    res.status(500).json({ message: 'Top-up failed' });
  }
});

router.get('/wakeel', async (req, res) => {
  try {
    const wakeels = await Wakeel.find();
    res.status(200).json(wakeels);
  } catch (error) {
    console.error('Error fetching wakeels:', error);
    res.status(500).json({ message: 'Error fetching wakeels' });
  }
});


// Add a sea fee
router.post('/add-sea-fee', authMiddleware, async (req, res) => {
  const { label, rate } = req.body;

  try {
    const newFee = new SeaFee({ label, rate });
    await newFee.save();
    res.status(201).json({ success: true, message: 'Sea fee added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding sea fee' });
  }
});

// Get all sea fees
router.get('/sea-fees', authMiddleware, async (req, res) => {
  try {
    const fees = await SeaFee.find().sort({ createdAt: -1 });
    res.status(200).json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching fees' });
  }
});

// Delete a sea fee
router.delete('/sea-fees/:id', authMiddleware, async (req, res) => {
  try {
    await SeaFee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Fee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting fee' });
  }
});

// Save new towing/pilotage voucher
router.post('/vouchers', async (req, res) => {
  try {
    const voucherData = req.body;

    const newVoucher = new Voucher(voucherData);
    await newVoucher.save();

    res.status(201).json({ success: true, message: 'Voucher saved successfully', voucher: newVoucher });
  } catch (error) {
    console.error('Error saving voucher:', error);
    res.status(500).json({ success: false, message: 'Failed to save voucher' });
  }
});

// Fetch vouchers by date range
router.get('/vouchers', authMiddleware, async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    const vouchers = await Voucher.find({
      date: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      }
    }).sort({ date: -1 });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    res.status(500).json({ message: 'Failed to fetch vouchers' });
  }
});



router.post('/protection-net', authMiddleware, async (req, res) => {
  try {
    const {
      shipId,
      shipName,
      companyName,
      days,
      netsUsed,
      netRate,
      total,
      delays
    } = req.body;

    const entry = new ProtectionNet({
      shipId,
      shipName,
      companyName,
      days,
      netsUsed,
      netRate,
      total,
      delays
    });

    await entry.save();
    res.status(201).json({ message: 'Protection Net entry saved', entry });
  } catch (error) {
    console.error('Error saving protection net data:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

// Get all bills by company name
router.get('/protection-net/company/:companyName', async (req, res) => {
  try {
    const { companyName } = req.params;
    const bills = await ProtectionNet.find({ companyName: { $regex: new RegExp(companyName, 'i') } });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching protection net bills' });
  }
});



module.exports = router;

