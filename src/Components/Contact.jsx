import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".contact-form input, .contact-form textarea, .contact-form button",
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50vh] bg-[url(/src/assets/contactbg.jpg)] bg-bottom">
        <div className="text-[4.5rem] text-white font-[300]">BOOK A TABLE</div>
      </div>
      <div ref={sectionRef} className="min-h-screen px-6 py-12 bg-[#fdfdfd]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-semibold mb-6 text-[#2e2e2e]">
              Contact Snooze Eatery
            </h2>
            <p className="mb-4 text-gray-700">
              Whether you’re planning an event, asking a question, or just want
              to say hi, we’re here to help.
            </p>
            <ul className="text-gray-800 space-y-2">
              <li>
                📞 <strong>Phone:</strong>{" "}
                <a href="tel:+1234567890">+1 234 567 890</a>
              </li>
              <li>
                📧 <strong>Email:</strong>{" "}
                <a href="mailto:hello@snoozeeatery.com">
                  hello@snoozeeatery.com
                </a>
              </li>
              <li>
                📍 <strong>Address:</strong> 123 Sunny Lane, Foodie City, NY
                10001
              </li>
            </ul>

            <div className="mt-8">
              <iframe
                title="Snooze Eatery Location"
                className="w-full h-[300px] rounded-lg border"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019339330319!2d-122.40110738467816!3d37.79295497975625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064cb0d3a1b%3A0x6aeeae1d3e84ef0d!2sFood%20Court!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                allowFullScreen=""
                aria-hidden="false"
              ></iframe>
            </div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="contact-form bg-white shadow-lg rounded-xl p-8 space-y-6"
            >
              <div>
                <label className="block text-gray-800 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full mt-1 border p-3 rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2e2e2e] text-white p-3 rounded-md hover:bg-[#444] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
