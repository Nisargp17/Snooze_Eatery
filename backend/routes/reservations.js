const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const nodemailer = require("nodemailer");
require("dotenv").config();
router.post("/", async (req, res) => {
  const reservationData = req.body;

  try {
    const newReservation = new Reservation(reservationData);
    await newReservation.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reservationData.email,
      subject: " Table Reservation Confirmation",
      text: `
Hi ${reservationData.name},

Your reservation has been confirmed!

 Date: ${reservationData.date}
 Time: ${reservationData.time}
 Guests: ${reservationData.guests}
 Special Requests: ${reservationData.requests || "None"}

We look forward to seeing you!

Best regards,  
Snoozer Eatery
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reservation saved and email sent!" });
  } catch (error) {
    console.error("Error handling reservation:", error.message);
    res.status(500).json({ message: "Server error while saving reservation." });
  }
});

module.exports = router;
