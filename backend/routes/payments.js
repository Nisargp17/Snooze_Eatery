import { Router } from "express";
import Reservation from "../models/reservation.js";

const router = Router();

router.post("/confirm-payment", async (req, res) => {
  const { reservationId } = req.body;

  try {
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    reservation.status = "confirmed";
    await reservation.save();

    res
      .status(200)
      .json({ message: "Payment confirmed. Reservation updated." });
  } catch (error) {
    console.error("Error confirming payment:", error.message);
    res.status(500).json({ message: "Error confirming payment." });
  }
});

export default router;
