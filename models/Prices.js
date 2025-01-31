const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  shipmentType: {
    type: String,
    required: true, // e.g., "عوائد مناولة"
  },
  containerType: {
    type: String,
    required: true, // e.g., "حاويات تفريغ", "حاويات تصدير معباة"
  },
  containerSize: {
    type: Number,
    required: true, // e.g., 38.5, 77
  },
  weight: {
    type: Number,
    required: true,
  },
  pricePerContainer: {
    type: Number,
    required: true, // e.g., 375, 750
  },
  calculationMethod: {
    type: String,
    enum: ['amount', 'volume', 'pouring'], // Only "amount" or "volume" is allowed
    required: true,
  },
  volume: {
    type: Number,
    default: null, // Optional, only used when calculationMethod === 'volume'
  },
});

module.exports = mongoose.model('Price', priceSchema);
