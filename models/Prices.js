const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  shipmentType: {
    type: String,
  },
  serviceType: {
    type: String,
    required: true,
  },
  containerType: {
    type: String,
    required: true, // e.g., "حاويات تفريغ", "حاويات تصدير معباة"
  },
  containerSize: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  pricePerContainer: {
    type: Number,
    required: true, // e.g., 375, 750
  },
  calculationMethod: {
    type: String,
    enum: ["amount", "volume", "pouring"], // Only "amount" or "volume" is allowed
    required: true,
  },
  volume: {
    type: Number,
    default: null, // Optional, only used when calculationMethod === 'volume'
  },
  applyDiscount: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  discountedPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model("Price", priceSchema);
