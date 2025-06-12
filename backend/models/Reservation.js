const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  guests: Number,
  requests: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
