// models/Ship.js
const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
  shipName: { type: String, required: true },
  owner: { type: String, required: true },
  flag: { type: String, required: true },
  captainName: { type: String, required: true },
  shippingPort: { type: String },
  shipNumber: { type: String },
  bayanNumber: { type: String },
  startWorkingDate: { type: Date }, // New field for start working date
  policies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Policy' }],
});



module.exports = mongoose.model('Ship', ShipSchema);
