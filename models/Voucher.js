// models/Voucher.js

const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  label: String,
  rate: Number,
  amount: Number,
});

const VoucherSchema = new mongoose.Schema({
  shipId: String,
  shipName: String,
  wakeelName: String,
  bayanNumber: String,
  bayanYear: String,
  shipmentType: String,
  flag: String,
  netWeight: Number,
  stayDays: Number,
  date: Date,
  calculatedFees: [FeeSchema],
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model('Voucher', VoucherSchema);
