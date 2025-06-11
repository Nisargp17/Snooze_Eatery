import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BookTable = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    requests: "",
  });

  useEffect(() => {
    const formEl = formRef.current;

    gsap.fromTo(
      formEl,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formEl,
          start: "top 70%",
        },
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call)
    alert("Table booked successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 1,
      requests: "",
    });
  };

  return (
    <div
      ref={formRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#f8f8f8]"
    >
      <h2 className="text-4xl font-semibold mb-10 text-center text-[#333]">
        Book a Table
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-md w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-md w-full"
          />
          <input
            type="number"
            name="guests"
            placeholder="Guests"
            min={1}
            max={20}
            required
            value={formData.guests}
            onChange={handleChange}
            className="border p-3 rounded-md w-full"
          />
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="border p-3 rounded-md w-full"
          />
          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="border p-3 rounded-md w-full"
          />
        </div>

        <textarea
          name="requests"
          rows="4"
          placeholder="Special Requests (Optional)"
          value={formData.requests}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />

        <button
          type="submit"
          className="bg-[#2e2e2e] text-white px-6 py-3 rounded-md hover:bg-[#444] transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookTable;
