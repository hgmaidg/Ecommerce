const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  //giới hạn số lần sử dụng
  limitTurn: {
    type: Number,
    default: 1,
  },
  //số lần mã khuyến mãi được sử dụng
  usedTurn: {
    type: Number,
    default: 0,
  },
  minBillToApply: {
    type: Number,
    default: 0,
  },
  totalSalePrice: {
    type: Number,
    default: 0,
  },
});

//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
