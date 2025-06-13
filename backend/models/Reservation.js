const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["table", "event"],
    default: "table",
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: String,
  eventName: String,
  persons: Number,
  requests: String,
  status: { type: String, enum: ["waiting", "confirmed"], default: "waiting" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
