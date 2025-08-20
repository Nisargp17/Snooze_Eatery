import { Schema, model } from "mongoose";
const reservationSchema = new Schema({
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
  startTime: { type: Date },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
});
reservationSchema.index({ date: 1, startTime: 1, endTime: 1 });

export default model("reservation", reservationSchema);
