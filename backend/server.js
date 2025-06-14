const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const reservationRoutes = require("./routes/reservations");
app.use("/api/reservations", reservationRoutes);

const paymentRoutes = require("./routes/payments");
app.use("/api/payment", paymentRoutes);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment Intent creation failed", error);
    res.status(500).send({ error: "Payment intent creation failed" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server running at http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
