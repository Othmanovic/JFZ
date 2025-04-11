const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  billNumber: { type: String, required: true },
  receiver: { type: String, required: true },
  goodsDescription: { type: String },
  containerNumber: { type: String },
  weight: { type: Number },
  containerSize: { type: String },
  goodsSize: { type: String },
  cooling: { type: String },
  isShared: { type: Boolean },
  shipmentType: { type: String }, // From Sea Management
  serviceType: { type: String },
  containerType: { type: String },
  billAmount: { type: Number, required: true },
  shipId: { type: mongoose.Schema.Types.ObjectId, ref: "Ship", required: true },
  shipName: { type: String }, // From Sea Management
  owner: { type: String }, // From Sea Management
  shippingPort: { type: String }, // From Sea Management
  totalWeight: { type: Number }, // From Sea Management
  netWeight: { type: Number }, // From Sea Management
  arrivalDate: { type: Date }, // From Sea Management
  captainName: { type: String }, // From Sea Management

  // 🚢 New Fields
  bayanNumber: { type: Number, required: true }, // Bayan Number from Sea Management
  bayanYear: { type: Number, required: true }, // Bayan Year from Sea Management
  // policyNumber: { type: String, required: true }, // Policy Number from Policy Table

  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending Review", "Accepted", "Denied"],
    default: "Pending Review",
  },
});

module.exports = mongoose.model("Bill", BillSchema);
