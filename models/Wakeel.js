// models/Wakeel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['top-up', 'deduction'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,
});

const wakeelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

module.exports = mongoose.model('Wakeel', wakeelSchema);
