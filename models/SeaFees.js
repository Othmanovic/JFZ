const mongoose = require('mongoose');

const SeaFeeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('SeaFee', SeaFeeSchema);
