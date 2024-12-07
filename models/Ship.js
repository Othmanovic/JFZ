// models/Ship.js
const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  billNumber: { type: String, required: true },
  receiver: { type: String, required: true },
  goodsDescription: { type: String, required: true },
  containerNumber: { type: String, required: true },
  weight: { type: Number, required: true },
  containerSize: { type: String, required: true },
  goodsSize: { type: String, required: true },
  cooling: { type: String, required: true },
  isShared: { type: Boolean, default: false },
  shipmentType: { type: String, required: true }
});

const ShipSchema = new mongoose.Schema({
  shipName: { type: String, required: true },
  owner: { type: String, required: true },
  flag: { type: String, required: true },
  captainName: { type: String, required: true },
  shippingPort: { type: String },
  shipNumber: { type: String },
  policy: { type: PolicySchema } // Add the policy as an embedded object
});

module.exports = mongoose.model('Ship', ShipSchema);
