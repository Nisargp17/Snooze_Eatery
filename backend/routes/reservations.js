import { Router } from "express";
const router = Router();
import Reservation from "../models/reservation.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// GET endpoint to check date availability
router.get("/check-availability", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    // Get all reservations for the specified date
    const reservations = await Reservation.find({ date });

    // Calculate busy time slots
    const busySlots = reservations.map((reservation) => ({
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      duration: reservation.duration,
    }));

    // Check if the date is fully booked (assuming restaurant hours 11 AM - 11 PM)
    const restaurantOpen = new Date(`${date}T10:00:00`);
    const restaurantClose = new Date(`${date}T24:00:00`);

    // Find available time slots
    const availableSlots = [];
    let currentTime = new Date(restaurantOpen);

    while (currentTime < restaurantClose) {
      const slotEnd = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000); // 4-hour slots

      if (slotEnd <= restaurantClose) {
        // Check if this slot conflicts with existing reservations
        const hasConflict = busySlots.some((busySlot) => {
          const bufferMs = 4 * 60 * 60 * 1000; // 4-hour buffer
          const minAllowedStart = new Date(currentTime.getTime() - bufferMs);
          const maxAllowedEnd = new Date(slotEnd.getTime() + bufferMs);

          return (
            (busySlot.startTime < slotEnd && busySlot.endTime > currentTime) ||
            (busySlot.startTime < maxAllowedEnd &&
              busySlot.endTime > minAllowedStart)
          );
        });

        if (!hasConflict) {
          availableSlots.push({
            startTime: currentTime.toTimeString().slice(0, 5),
            endTime: slotEnd.toTimeString().slice(0, 5),
          });
        }
      }

      currentTime = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000);
    }

    res.json({
      date,
      isAvailable: availableSlots.length > 0,
      availableSlots,
      busySlots: busySlots.map((slot) => ({
        startTime: slot.startTime.toTimeString().slice(0, 5),
        endTime: slot.endTime.toTimeString().slice(0, 5),
      })),
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Error checking availability" });
  }
});

// GET endpoint to get all unavailable dates for the next 30 days
router.get("/unavailable-dates", async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysFromNow = new Date(
      today.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    // Get all reservations in the next 30 days
    const reservations = await Reservation.find({
      date: {
        $gte: today.toISOString().split("T")[0],
        $lte: thirtyDaysFromNow.toISOString().split("T")[0],
      },
    });

    // Group reservations by date
    const reservationsByDate = {};
    reservations.forEach((reservation) => {
      if (!reservationsByDate[reservation.date]) {
        reservationsByDate[reservation.date] = [];
      }
      reservationsByDate[reservation.date].push(reservation);
    });

    // Find dates that are fully booked
    const unavailableDates = [];
    const currentDate = new Date(today);

    while (currentDate <= thirtyDaysFromNow) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const dayReservations = reservationsByDate[dateStr] || [];

      // Check if the date is fully booked (assuming restaurant hours 11 AM - 11 PM)
      const restaurantOpen = new Date(`${dateStr}T10:00:00`);
      const restaurantClose = new Date(`${dateStr}T24:00:00`);

      let availableSlots = 0;
      let currentTime = new Date(restaurantOpen);

      while (currentTime < restaurantClose) {
        const slotEnd = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000); // 4-hour slots

        if (slotEnd <= restaurantClose) {
          // Check if this slot conflicts with existing reservations
          const hasConflict = dayReservations.some((reservation) => {
            const bufferMs = 4 * 60 * 60 * 1000; // 4-hour buffer
            const minAllowedStart = new Date(currentTime.getTime() - bufferMs);
            const maxAllowedEnd = new Date(slotEnd.getTime() + bufferMs);

            return (
              (reservation.startTime < slotEnd &&
                reservation.endTime > currentTime) ||
              (reservation.startTime < maxAllowedEnd &&
                reservation.endTime > minAllowedStart)
            );
          });

          if (!hasConflict) {
            availableSlots++;
          }
        }

        currentTime = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000);
      }

      // If no available slots, mark date as unavailable
      if (availableSlots === 0) {
        unavailableDates.push(dateStr);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json({
      unavailableDates,
      totalDays: 30,
      availableDays: 30 - unavailableDates.length,
    });
  } catch (error) {
    console.error("Error getting unavailable dates:", error);
    res.status(500).json({ message: "Error getting unavailable dates" });
  }
});

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
