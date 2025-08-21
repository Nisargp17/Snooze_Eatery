import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PaymentForm from "./PaymentForm";

const InputField = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  minLength,
  min,
  placeholder,
  error,
  autoComplete,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm mb-1 text-gray-700 font-medium"
    >
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      min={min}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="mt-1 text-red-600 text-xs font-medium"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
);

const TextAreaField = ({
  id,
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  error,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm mb-1 text-gray-700 font-medium"
    >
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      rows={4}
      className={`w-full border rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-black ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="mt-1 text-red-600 text-xs font-medium"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
);

const ReservationForm = () => {
  const containerRef = useRef(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const [reservationId, setReservationId] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
    persons: "",
    date: "",
    time: "",
    duration: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 0, y: 40, visibility: "hidden" });
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      visibility: "visible",
      duration: 1,
      ease: "power2.out",
    });
    
    // Fetch unavailable dates on component mount
    fetchUnavailableDates();
  }, []);

  // Fetch unavailable dates for the next 30 days
  const fetchUnavailableDates = async () => {
    try {
      setLoadingAvailability(true);
      const response = await fetch(`${API_BASE}/api/reservations/unavailable-dates`);
      if (response.ok) {
        const data = await response.json();
        setUnavailableDates(data.unavailableDates);
      }
    } catch (error) {
      console.error("Error fetching unavailable dates:", error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Check availability for a specific date and get available time slots
  const checkDateAvailability = async (date) => {
    if (!date) return;
    
    try {
      setLoadingAvailability(true);
      const response = await fetch(`${API_BASE}/api/reservations/check-availability?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        if (data.isAvailable) {
          setAvailableTimes(data.availableSlots);
        } else {
          setAvailableTimes([]);
        }
      }
    } catch (error) {
      console.error("Error checking date availability:", error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Check if a date is disabled (unavailable)
  const isDateDisabled = (dateString) => {
    return unavailableDates.includes(dateString);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    // Add 1 day to prevent booking today (restaurant needs time to prepare)
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from today)
  const getMaxDate = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return thirtyDaysFromNow.toISOString().split('T')[0];
  };

  // Check if a date is in the past
  const isDateInPast = (dateString) => {
    const selectedDate = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return selectedDate < tomorrow;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Please enter your name (min 2 characters).";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.event.trim()) {
      newErrors.event = "Please enter the event name.";
    }
    if (!formData.persons || Number(formData.persons) < 1) {
      newErrors.persons = "Please enter the number of guests (at least 1).";
    }
    if (!formData.date) {
      newErrors.date = "Please select the event date.";
    } else if (isDateInPast(formData.date)) {
      newErrors.date = "Cannot book events in the past. Please select a future date.";
    } else if (availableTimes.length === 0) {
      newErrors.date = "The selected date has no available time slots. Please choose another date.";
    }
    if (!formData.time) {
      newErrors.time = "Please select the start time.";
    }
    if (!formData.duration.trim()) {
      newErrors.duration = "Please specify the event duration.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please add any additional notes.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    // If date changes, check availability and reset time
    if (name === 'date') {
      checkDateAvailability(value);
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   setLoading(true);
  //   setSubmitStatus(null);

  //   const reservation = {
  //     type: "event",
  //     name: formData.name.trim(),
  //     email: formData.email.trim(),
  //     eventName: formData.event.trim(),
  //     persons: Number(formData.persons),
  //     date: formData.date,
  //     time: formData.time,
  //     duration: formData.duration.trim(),
  //     requests: formData.message.trim(),
  //   };

  //   try {
  //     const res = await fetch(`${API_BASE}/api/reservations`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(reservation),
  //     });

  //     if (!res.ok) throw new Error("Network response was not ok");

  //     const data = await res.json();
  //     setReservationId(result.reservationId);
  //     setIsPaymentModalOpen(true);
  //     setSubmitStatus({
  //       type: "success",
  //       message: data.message || "Reservation successful!",
  //     });

  //     setFormData({
  //       name: "",
  //       email: "",
  //       event: "",
  //       persons: "",
  //       date: "",
  //       time: "",
  //       duration: "",
  //       message: "",
  //     });
  //     setErrors({});
  //   } catch (error) {
  //     console.error("Error submitting event reservation:", error);
  //     setSubmitStatus({
  //       type: "error",
  //       message: "Failed to submit reservation. Please try again.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitStatus(null);

    const reservation = {
      type: "event",
      name: formData.name.trim(),
      email: formData.email.trim(),
      eventName: formData.event.trim(),
      persons: Number(formData.persons),
      date: formData.date,
      time: formData.time,
      duration: formData.duration.trim(),
      requests: formData.message.trim(),
    };

    try {
      // 1️⃣ Send reservation
      const res = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSubmitStatus({ type: "error", message: err.message || "Failed to submit reservation." });
        return;
      }
      const data = await res.json();

      setReservationId(data.reservationId); // Correct variable name!

      // 2️⃣ Create Stripe PaymentIntent and get client secret
      const payRes = await fetch(
        `${API_BASE}/api/payment/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservationId: data.reservationId,
            amount: 1000, // customize as needed
          }),
        }
      );
      const payData = await payRes.json();
      setClientSecret(payData.clientSecret);

      // 3️⃣ Open payment modal
      setIsPaymentModalOpen(true);

      setSubmitStatus({
        type: "success",
        message:
          data.message ||
          "Reservation successful! Please complete payment to confirm.",
      });

      // (Optional) Clear form
      setFormData({
        name: "",
        email: "",
        event: "",
        persons: "",
        date: "",
        time: "",
        duration: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async ({ paymentDetails, reservationId }) => {
    try {
      const response = await fetch(`${API_BASE}/api/payment/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "🎉 Payment successful! Your booking is confirmed."
        });
        setIsPaymentModalOpen(false);
      } else {
        setSubmitStatus({
          type: "error", 
          message: "Payment failed: " + result.message
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setSubmitStatus({
        type: "error",
        message: "Payment failed. Please try again."
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50vh] bg-[url(/src/assets/reservationbg.jpg)] bg-bottom">
        <div className="text-[4.5rem] text-white font-[300]">BOOK A TABLE</div>
      </div>

      <section
        className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-16"
        aria-labelledby="reservation-heading"
      >
        <div
          ref={containerRef}
          className="w-full max-w-3xl mx-auto border border-gray-300 rounded-2xl p-10 shadow-sm bg-white overflow-hidden"
        >
          <header className="mb-10 text-center">
            <h1
              id="reservation-heading"
              className="text-3xl md:text-4xl font-medium tracking-tight"
            >
              Reserve a Private Event
            </h1>
            <p className="text-gray-600 mt-2">
              Exclusively tailored for your special moments
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Booking Information:</strong> We offer 4-hour event slots with 4-hour buffers between events. 
                Available dates are shown below. Please select a date to see available time slots.
              </p>
              {loadingAvailability && (
                <p className="text-sm text-blue-600 mt-2">
                  Loading availability...
                </p>
              )}
              {unavailableDates.length > 0 && (
                <p className="text-sm text-orange-600 mt-2">
                  <strong>Fully Booked Dates:</strong> {unavailableDates.slice(0, 5).join(', ')}
                  {unavailableDates.length > 5 && ` and ${unavailableDates.length - 5} more...`}
                </p>
              )}
            </div>
            
            {/* Simple Calendar View */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Date Overview</h3>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-medium text-gray-600 p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const dateStr = date.toISOString().split('T')[0];
                  const isUnavailable = unavailableDates.includes(dateStr);
                  const isPast = isDateInPast(dateStr);
                  const isToday = i === 0;
                  
                  return (
                    <div
                      key={i}
                      className={`text-center p-2 text-xs rounded cursor-pointer ${
                        isPast ? 'text-gray-400 bg-gray-100' :
                        isUnavailable ? 'text-red-600 bg-red-100' :
                        isToday ? 'text-blue-600 bg-blue-100 font-bold' :
                        'text-gray-800 bg-white hover:bg-blue-50'
                      }`}
                      title={isPast ? 'Past date' : 
                             isUnavailable ? 'Fully booked' : 
                             isToday ? 'Today' : 'Available'}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-100 text-red-600 rounded"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-100 text-blue-600 rounded"></div>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            noValidate
          >
            <InputField
              id="name"
              label="Your Name"
              name="name"
              value={formData.name}
              required
              minLength={2}
              autoComplete="name"
              onChange={handleChange}
              error={errors.name}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              required
              autoComplete="email"
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              id="event"
              label="Event Name"
              name="event"
              value={formData.event}
              required
              placeholder="e.g. Birthday Dinner"
              onChange={handleChange}
              error={errors.event}
            />

            <InputField
              id="persons"
              label="Number of Guests"
              name="persons"
              type="number"
              value={formData.persons}
              required
              min={1}
              placeholder="e.g. 10"
              onChange={handleChange}
              error={errors.persons}
            />

            <div>
              <label
                htmlFor="date"
                className="block text-sm mb-1 text-gray-700 font-medium"
              >
                Event Date
                <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                required
                onChange={handleChange}
                min={getMinDate()}
                max={getMaxDate()}
                disabled={loadingAvailability}
                className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } ${loadingAvailability ? "opacity-50 cursor-not-allowed" : ""}`}
                onBlur={(e) => checkDateAvailability(e.target.value)}
              />
              {errors.date && (
                <p
                  id="date-error"
                  className="mt-1 text-red-600 text-xs font-medium"
                  role="alert"
                >
                  {errors.date}
                </p>
              )}
              {loadingAvailability && (
                <p className="mt-1 text-blue-600 text-xs">
                  Checking availability...
                </p>
              )}
              {formData.date && availableTimes.length === 0 && !loadingAvailability && (
                <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded">
                  <p className="text-orange-700 text-xs">
                    <strong>Date Unavailable:</strong> This date is fully booked. 
                    Please select another date from the calendar above.
                  </p>
                </div>
              )}
              {formData.date && availableTimes.length > 0 && !loadingAvailability && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-700 text-xs">
                    <strong>Date Available!</strong> {availableTimes.length} time slot(s) available.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm mb-1 text-gray-700 font-medium"
              >
                Start Time
                <span className="text-red-600 ml-1">*</span>
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={loadingAvailability || availableTimes.length === 0}
                className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.time ? "border-red-500" : "border-gray-300"
                } ${(loadingAvailability || availableTimes.length === 0) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <option value="">
                  {loadingAvailability ? "Checking availability..." : 
                   availableTimes.length === 0 ? "No available times for this date" : 
                   "Select a time"}
                </option>
                {availableTimes.map((slot) => (
                  <option key={slot.startTime} value={slot.startTime}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p
                  id="time-error"
                  className="mt-1 text-red-600 text-xs font-medium"
                  role="alert"
                >
                  {errors.time}
                </p>
              )}
            </div>

            <InputField
              id="duration"
              label="Duration"
              name="duration"
              value={formData.duration}
              required
              placeholder="e.g. 3 hours"
              onChange={handleChange}
              error={errors.duration}
            />

            <div className="md:col-span-2">
              <TextAreaField
                id="message"
                label="Additional Notes"
                name="message"
                value={formData.message}
                required
                placeholder="Anything we should know?"
                onChange={handleChange}
                error={errors.message}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading || availableTimes.length === 0}
                className={`cursor-pointer w-full py-3 rounded-md bg-black text-white transition focus:outline-none focus:ring-2 focus:ring-black ${
                  loading || availableTimes.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-neutral-900"
                }`}
              >
                {loading ? "Submitting..." : 
                 availableTimes.length === 0 ? "Select Available Date First" : 
                 "Confirm Reservation"}
              </button>
            </div>
          </form>
          {isPaymentModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
              aria-modal="true"
            >
              <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative shadow-lg">
                <button
                  aria-label="Close modal"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-3xl leading-none"
                >
                  &times;
                </button>

                <h3 className="text-2xl font-semibold mb-6 text-center">
                  Enter Payment Details
                </h3>

                {/* Pass clientSecret + reservationId to your PaymentForm */}
                <PaymentForm
                  clientSecret={clientSecret}
                  amount={1000}
                  reservationId={reservationId}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>
            </div>
          )}

          {submitStatus && (
            <div
              role="alert"
              aria-live="assertive"
              className={`mt-6 p-4 rounded-md font-medium ${
                submitStatus.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ReservationForm;
