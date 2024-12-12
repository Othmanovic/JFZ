// models/Ship.js
const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
  shipName: { type: String, required: true },
  owner: { type: String, required: true },
  flag: { type: String, required: true },
  captainName: { type: String, required: true },
  shippingPort: { type: String },
  shipNumber: { type: String },
  policy: [
    {
      billNumber: String,
      receiver: String,
      goodsDescription: String,
      containerNumber: String,
      weight: Number,
      containerSize: String,
      goodsSize: String,
      cooling: String,
      isShared: Boolean,
      shipmentType: String,
    },
  ],
});

module.exports = mongoose.model('Ship', ShipSchema);
