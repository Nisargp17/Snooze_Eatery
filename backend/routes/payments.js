import { Router } from "express";
import Stripe from "stripe";
import Reservation from "../models/reservation.js";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1️⃣ Create PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { reservationId, amount } = req.body;

    // verify reservation exists
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g. 1000 = $10.00
      currency: "usd",
      metadata: { reservationId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ message: "Failed to create payment intent." });
  }
});

// 2️⃣ Confirm Payment
router.post("/confirm-payment", async (req, res) => {
  const { reservationId } = req.body;

  try {
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    reservation.status = "confirmed";
    await reservation.save();

    res.status(200).json({
      message: "Payment confirmed. Reservation updated.",
    });
  } catch (error) {
    console.error("Error confirming payment:", error.message);
    res.status(500).json({ message: "Error confirming payment." });
  }
});

export default router;
