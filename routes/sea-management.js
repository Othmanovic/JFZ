const express = require('express');
const router = express.Router();
const SeaManagement = require('../models/SeaManagement');
const Ship = require('../models/Ship');
const Policy = require('../models/Policy');
const authMiddleware = require('../middleware/auth');

// router.post('/sea-management', async (req, res) => {
//   try {
//     const newShipArrival = new SeaManagement(req.body);
//     await newShipArrival.save();
//     res.status(201).json({ success: true, message: 'Ship arrival saved successfully' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error saving ship arrival data' });
//   }
// });

router.post('/sea-management', authMiddleware, async (req, res, next) => {
  let seaManagement = new SeaManagement({
    shipName: req.body.shipName,
    owner: req.body.owner,
    agent: req.body.agent,
    callSign: req.body.callSign,
    flag: req.body.flag,
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
    console.log("Sea management: ",seaManagement);
    
    res.status(201).json({ success: true, message: 'Sea Management saved successfully' });
  } catch (err) {
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

// Route to get ship arrival details by ID
router.get('/ship-arrival-details/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ship arrival", id);

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

// Get policies for a specific ship
router.get('/ships/:id/policies', async (req, res) => {
  const { id } = req.params;
  console.log("ship id: ", id);

  try {
    const policies = await Policy.find({ ship: id }); // Fetch policies tied to the ship
    console.log("policies", policies);

    res.status(200).json(policies);
  } catch (err) {
    console.error(err);
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




module.exports = router;
