import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img1 from "/src/assets/booktable.jpg";

gsap.registerPlugin(ScrollTrigger);

const BookTable = () => {
  const formRef = useRef(null);
  const popupRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "11:00",
    guests: 1,
    requests: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Animate the main form on scroll into view
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

  // Show popup animation when it becomes visible
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

  const generateTimes = () => {
    const times = [];
    let hour = 10;
    const minutes = ["00", "30"];
    for (let i = 0; i < 13; i++) {
      minutes.forEach((minute) => {
        const time = `${(hour % 12) + 1}:${minute}`;
        times.push(`${time} ${hour < 11 ? "AM" : "PM"}`);
      });
      hour = hour === 11 ? 12 : hour + 1;
    }
    return times;
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showPopup("🎉 Booking confirmed! Confirmation email sent.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "11:00",
          guests: 1,
          requests: "",
        });
        setIsModalOpen(false);
      } else {
        showPopup(" Booking failed: " + result.message);
      }
    } catch (error) {
      console.error("Frontend error:", error);
      showPopup(" Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={formRef}
      className="h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gray-100"
    >
      <div className="h-[77vh] flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 h-80 md:h-auto">
          <img
            src={Img1}
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-[77vh] md:w-1/2 p-8 space-y-15 flex flex-col justify-center">
          <h2 className="text-[2vw] font-bold text-gray-800 text-center md:text-left">
            Reserve Your Table
          </h2>

          <div className="flex flex-col w-[20vw] gap-8">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border p-3 rounded-md w-full"
            />

            <div className="relative">
              <input
                type="text"
                name="time"
                value={formData.time}
                onClick={handleDropdownToggle}
                readOnly
                required
                className="border p-3 rounded-md w-full cursor-pointer"
              />

              {isDropdownOpen && (
                <div className="absolute left-0 w-full bg-white border shadow-md mt-2 max-h-[20vh] overflow-y-auto z-10">
                  <ul>
                    {generateTimes().map((time, index) => (
                      <li
                        key={index}
                        className="p-3 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            time: time,
                          }));
                          setIsDropdownOpen(false);
                        }}
                      >
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <input
              type="number"
              name="guests"
              min={1}
              max={20}
              value={formData.guests}
              onChange={handleChange}
              required
              className="border p-3 rounded-md w-full"
            />
          </div>

          <button
            onClick={() => {
              if (!formData.date || !formData.time) {
                showPopup("Please fill in Date and Time to proceed.");
              } else {
                setIsModalOpen(true);
              }
            }}
            className="bg-black text-white px-6 py-3 w-[20vw] rounded-md hover:bg-gray-800 transition"
          >
            Book Table
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-6 text-center">
              Complete Your Booking
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-md w-full"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-md w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-md w-full"
                />
                <textarea
                  name="requests"
                  rows="3"
                  placeholder="Special Requests"
                  value={formData.requests}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full flex justify-center items-center ${
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div
          ref={popupRef}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white text-black shadow-lg border px-6 py-3 rounded-md z-50"
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default BookTable;
