const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  billNumber: String,
  receiver: String,
  goodsDescription: String,
  containerNumber: String,
  weight: Number,
  containerSize: String, // Keep as String to match existing behavior
  goodsSize: String,
  cooling: String,
  isShared: Boolean,
  shipmentType: String,
  containerType: String, // Add this field
  ship: { type: mongoose.Schema.Types.ObjectId, ref: 'Ship' },
  bill: Number, // Optional
});

module.exports = mongoose.model('Policy', policySchema);
