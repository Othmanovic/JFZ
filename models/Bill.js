const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  billNumber: { type: String, required: true },
  receiver: { type: String, required: true },
  goodsDescription: { type: String, required: true },
  billAmount: { type: Number, required: true },
  shipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ship', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Pending Review', 'Accepted', 'Denied'], 
    default: 'Pending Review' 
  } // Status of the bill
});

module.exports = mongoose.model('Bill', BillSchema);

