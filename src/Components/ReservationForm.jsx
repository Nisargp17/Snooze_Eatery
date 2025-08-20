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

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 0, y: 40, visibility: "hidden" });
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      visibility: "visible",
      duration: 1,
      ease: "power2.out",
    });
  }, []);

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
        showPopup("🎉 Payment successful! Your booking is confirmed.");
        setIsPaymentModalOpen(false);
      } else {
        showPopup("Payment failed: " + result.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      showPopup("Payment failed. Please try again.");
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

            <InputField
              id="date"
              label="Event Date"
              name="date"
              type="date"
              value={formData.date}
              required
              onChange={handleChange}
              error={errors.date}
            />

            <InputField
              id="time"
              label="Start Time"
              name="time"
              type="time"
              value={formData.time}
              required
              onChange={handleChange}
              error={errors.time}
            />

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
                disabled={loading}
                className={`cursor-pointer w-full py-3 rounded-md bg-black text-white transition focus:outline-none focus:ring-2 focus:ring-black ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-neutral-900"
                }`}
              >
                {loading ? "Submitting..." : "Confirm Reservation"}
              </button>
            </div>
          </form>
          {isPaymentModalOpen && clientSecret && (
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
