import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img1 from "/src/assets/booktable.jpg";
import PaymentForm from "./PaymentForm";

gsap.registerPlugin(ScrollTrigger);

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const BookTable = () => {
  const formRef = useRef(null);
  const popupRef = useRef(null);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "11:00 AM",
    guests: 1,
    requests: "",
  });

  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(
      formRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (isPopupVisible && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { autoAlpha: 0, y: -40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      const timeout = setTimeout(() => {
        gsap.to(popupRef.current, {
          autoAlpha: 0,
          y: -40,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setIsPopupVisible(false),
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isPopupVisible]);

  const generateTimes = useMemo(() => {
    const times = [];
    let hour = 10;
    const minutes = ["00", "30"];
    for (let i = 0; i < 13; i++) {
      minutes.forEach((minute) => {
        const hr12 = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? "AM" : "PM";
        times.push(`${hr12}:${minute} ${ampm}`);
      });
      hour = hour === 23 ? 0 : hour + 1;
    }
    return times;
  }, []);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  useOnClickOutside(modalRef, (e) => {
    if (e.target === modalRef.current) {
      setIsModalOpen(false);
    }
  });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, [isModalOpen]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validatePhone = (phone) => /^\+?[\d\s\-()]{7,15}$/.test(phone.trim());

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const showPopup = useCallback((message) => {
    setPopupMessage(message);
    setPopupType("success");
    setIsPopupVisible(true);
  }, []);

  const showError = useCallback((message) => {
    setPopupMessage(message);
    setPopupType("error");
    setIsPopupVisible(true);
  }, []);

  const to24Hour = useCallback((timeLabel) => {
    if (!timeLabel) return timeLabel;
    const parts = timeLabel.split(" ");
    if (parts.length !== 2) return timeLabel;
    const [time, modifier] = parts;
    let [hour, minute] = time.split(":").map(Number);
    if (modifier === "PM" && hour !== 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;
    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");
    return `${hh}:${mm}`;
  }, []);

  const checkAvailability = async () => {
    if (!formData.date || !formData.time) {
      showError("Please fill in Date and Time to proceed.");
      return false;
    }

    const time24 = to24Hour(formData.time);
    const payload = {
      ...formData,
      time: time24,
      type: "table",
      status: "waiting",
      duration: "2"
    };

    try {
      const response = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        showError(result.message || 'Time slot not available.');
        return false;
      }

      return true;
    } catch (error) {
      console.error("Availability check error:", error);
      showError("Failed to check availability. Please try again.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return showError("Please enter your name.");
    if (!validateEmail(formData.email))
      return showError("Please enter a valid email.");
    if (!validatePhone(formData.phone))
      return showError("Please enter a valid phone number.");
    if (!formData.date) return showError("Please select a date.");
    if (!formData.time) return showError("Please select a time.");

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        showError(result.message || 'Booking failed.');
        return;
      }

      // If we get here, response was successful
      setReservationId(result.reservationId);
      showPopup("🎉 Booking confirmed! Please proceed with payment.");
      setIsPaymentModalOpen(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "11:00 AM",
        guests: 1,
        requests: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Frontend error:", error);
      showError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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

  const isBookDisabled = !formData.date || !formData.time;

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50vh] bg-[url(/src/assets/menubg.jpg)] bg-bottom">
        <div className="text-[4.5rem] text-white font-[300]">BOOK A TABLE</div>
      </div>
      <div
        ref={formRef}
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gray-100"
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 h-72 md:h-auto">
            <img
              src={Img1}
              alt="Restaurant interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-center items-center space-y-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">
              Reserve Your Table
            </h2>

            <div className="w-full max-w-xs flex flex-col gap-6">
              <label htmlFor="date" className="sr-only">
                Select date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                aria-describedby="dateHelp"
              />

              <label htmlFor="time" className="sr-only">
                Select time
              </label>
              <div className="relative" ref={dropdownRef}>
                <input
                  id="time"
                  name="time"
                  type="text"
                  readOnly
                  value={formData.time}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  className="border rounded-md p-3 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
                  aria-describedby="timeHelp"
                />
                {isDropdownOpen && (
                  <ul
                    role="listbox"
                    tabIndex={-1}
                    className="absolute left-0 right-0 bg-white border rounded-md shadow-lg max-h-48 overflow-auto z-20 mt-1"
                  >
                    {generateTimes.map((timeOption, idx) => (
                      <li
                        key={idx}
                        role="option"
                        tabIndex={0}
                        aria-selected={formData.time === timeOption}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            time: timeOption,
                          }));
                          setIsDropdownOpen(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setFormData((prev) => ({
                              ...prev,
                              time: timeOption,
                            }));
                            setIsDropdownOpen(false);
                            
                          }
                        }}
                        className={`p-3 cursor-pointer hover:bg-gray-200 ${
                          formData.time === timeOption
                            ? "bg-gray-300 font-semibold"
                            : ""
                        }`}
                      >
                        {timeOption}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label htmlFor="guests" className="sr-only">
                Number of guests
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                max={20}
                value={formData.guests}
                onChange={handleChange}
                required
                className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="button"
              onClick={async () => {
                if (isBookDisabled) {
                  showError("Please fill in Date and Time to proceed.");
                  return;
                }
                
                const isAvailable = await checkAvailability();
                if (isAvailable) {
                  setIsModalOpen(true);
                }
              }}
              disabled={isBookDisabled}
              className={`cursor-pointer bg-black text-white px-6 py-3 rounded-md w-full max-w-xs transition ${
                isBookDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
            >
              Book Table
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div
            ref={modalRef}
            tabIndex={-1}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
          >
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative shadow-lg">
              <button
                aria-label="Close modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-3xl leading-none"
              >
                &times;
              </button>

              <h3
                id="modal-title"
                className="text-2xl font-semibold mb-6 text-center"
              >
                Complete Your Booking
              </h3>

              <form onSubmit={handleSubmit} aria-describedby="modal-desc">
                <div className="space-y-6">
                  <label htmlFor="name" className="block font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <label htmlFor="email" className="block font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <label htmlFor="phone" className="block font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <label htmlFor="requests" className="block font-medium">
                    Special Requests
                  </label>
                  <textarea
                    id="requests"
                    name="requests"
                    rows="3"
                    placeholder="Special Requests"
                    value={formData.requests}
                    onChange={handleChange}
                    className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`cursor-pointer bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full flex justify-center items-center mt-6 ${
                    isLoading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  ) : (
                    "Confirm Reservation"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
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

              <PaymentForm
                amount={1000}
                reservationId={reservationId}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        )}

        {isPopupVisible && (
          <div
            ref={popupRef}
            className={`fixed top-20 right-5 ${
              popupType === 'error' ? 'bg-red-600' : 'bg-green-600'
            } text-white px-6 py-3 rounded-md shadow-lg z-50 select-none`}
            role="alert"
            aria-live="assertive"
          >
            {popupMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default BookTable;
