import { Router } from "express";
const router = Router();
import Reservation from "../models/reservation.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    const eventStart = new Date(`${data.date}T${data.time}`);
    const durationHours = Number(data.duration) || 0;
    const eventEnd = new Date(
      eventStart.getTime() + durationHours * 60 * 60 * 1000
    );

    const bufferMs = 4 * 60 * 60 * 1000;
    const minAllowedStart = new Date(eventStart.getTime() - bufferMs);
    const maxAllowedEnd = new Date(eventStart.getTime() + bufferMs);

    const checkConflict = await Reservation.findOne({
      date: data.date,
      $or: [
        {
          startTime: { $lt: eventEnd },
          endTime: { $gt: eventStart },
        },
        {
          startTime: { $lt: maxAllowedEnd },
          endTime: { $gt: minAllowedStart },
        },
      ],
    });

    if (checkConflict) {
      const bufferMs = 4 * 60 * 60 * 1000;
      const nextAvailableAt = new Date(
        checkConflict.endTime.getTime() + bufferMs
      );

      const humanDate = nextAvailableAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      const humanTime = nextAvailableAt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return res.status(400).json({
        message: `This time slot is not available. The restaurant is available after ${humanTime} on ${humanDate}.`,
        conflict: {
          existingStart: checkConflict.startTime,
          existingEnd: checkConflict.endTime,
          requestedStart: eventStart,
          requestedEnd: eventEnd,
        },
        nextAvailableAt: nextAvailableAt.toISOString(),
      });
    }

    const newReservation = new Reservation({
      ...data,
      type: data.type || "table",
      status: "waiting",
      startTime: eventStart,
      endTime: eventEnd,
    });

    await newReservation.save();
    console.log("Reservation saved:", newReservation);

    const transporter = createTransport({
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

Your event reservation is in waiting status, please complete the payment to confirm.

Event: ${data.eventName}
Date: ${data.date}
Time: ${data.time}
Guests: ${data.persons}
Duration: ${data.duration}
Notes: ${data.requests || "None"}

We look forward to hosting your event once payment is successful!

Best regards,  
Snoozer Eatery
        `
        : `
Hi ${data.name},

Your table reservation is in waiting status, please complete the payment to confirm.

Date: ${data.date}
Time: ${data.time}
Guests: ${data.guests}
Special Requests: ${data.requests || "None"}

Thank you for choosing Snoozer Eatery. Once payment is successful, your booking will be confirmed.

        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Reservation saved and email sent!",
      reservationId: newReservation._id,
    });
  } catch (error) {
    console.error("Error handling reservation:", error.message);
    res.status(500).json({ message: "Server error while saving reservation." });
  }
});

export default router;
