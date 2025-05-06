// models/Voucher.js
const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
  shipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ship' },
  shipName: { type: String, required: true },
  wakeelName: { type: String },
  bayanNumber: { type: String },
  bayanYear: { type: String },
  shipmentType: { type: String },
  flag: { type: String },
  netWeight: { type: Number },
  stayDays: { type: Number },
  date: { type: Date },
  calculatedFees: [
    {
      label: { type: String },
      rate: { type: Number },
      amount: { type: Number }
    }
  ],
  total: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Voucher', VoucherSchema);
