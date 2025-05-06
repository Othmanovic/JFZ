const mongoose = require('mongoose');

const ProtectionNetSchema = new mongoose.Schema({
  shipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ship',
    required: true
  },
  shipName: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  netsUsed: {
    type: Number,
    required: true
  },
  netRate: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  delays: {
    type: String,
    default: ''
  },
  companyName: {
    type: String,  // ✅ New field
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProtectionNet', ProtectionNetSchema);
