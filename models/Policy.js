const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  billNumber: String,
  receiver: String,
  goodsDescription: String,
  containerNumber: String,
  weight: Number,
  containerSize: String,
  goodsSize: String,
  cooling: Boolean,
  isShared: Boolean,
  shipmentType: String,
  serviceType: String,
  containerType: String,
  seaManagement: { type: mongoose.Schema.Types.ObjectId, ref: 'SeaManagement' }, // ✅ Reference SeaManagement
  shipName: String, // ✅ Store shipName for easy access
  bill: Number,
});

module.exports = mongoose.model('Policy', policySchema);
