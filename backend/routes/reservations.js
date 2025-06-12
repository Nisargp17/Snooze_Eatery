const express = require("express");
const router = express.Router(); // <<< THIS LINE fixes the ReferenceError
const Reservation = require("../models/Reservation");
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    const newReservation = new Reservation({
      ...data,
      type: data.type || "table", // defaults to 'table'
    });

    await newReservation.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isEvent = data.type === "event";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: isEvent
        ? "Your Event Reservation is Confirmed"
        : "Table Reservation Confirmation",
      text: isEvent
        ? `
Hi ${data.name},

Your event reservation has been confirmed!

Event: ${data.eventName}
Date: ${data.date}
Time: ${data.time}
Guests: ${data.persons}
Duration: ${data.duration}
Notes: ${data.requests || "None"}

We look forward to hosting your event!

Best regards,  
Snoozer Eatery
        `
        : `
Hi ${data.name},

Your table reservation has been confirmed!

Date: ${data.date}
Time: ${data.time}
Guests: ${data.guests}
Special Requests: ${data.requests || "None"}

Thank you for choosing Snoozer Eatery!

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
