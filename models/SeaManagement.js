const mongoose = require('mongoose');

// Define the SeaManagement schema
const SeaManagementSchema = new mongoose.Schema({
  shipName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  agent: {
    type: String,
    required: true,
  },
  callSign: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  totalWeight: {
    type: Number,
    required: true,
  },
  netWeight: {
    type: Number,
    required: true,
  },
  maxDive: {
    type: Number,
    required: true,
  },
  crewNumber: {
    type: Number,
    required: true,
  },
  crewNationality: {
    type: String,
    required: true,
  },
  shipmentType: {
    type: String,
    required: true,
  },
  shippingPort: {
    type: String,
    required: true,
  },
  comingFrom: {
    type: String,
    required: true,
  },
  travelingTo: {
    type: String,
    required: true,
  },
  shipmentDetails: {
    type: String,
    required: true,
  },
  shipmentWeight: {
    type: Number,
    required: true,
  },
  transitShipment: {
    type: String,
    default: false,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  captainName: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the SeaManagement model
const SeaManagement = mongoose.model('SeaManagement', SeaManagementSchema);

module.exports = SeaManagement;
