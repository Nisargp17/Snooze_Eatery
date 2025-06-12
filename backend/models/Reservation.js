const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["table", "event"],
    default: "table",
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String, // optional
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: String, // for events
  eventName: String,
  persons: Number, // guests or attendees
  requests: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
