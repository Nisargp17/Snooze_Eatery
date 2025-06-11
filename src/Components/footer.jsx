function Footer() {
  return (
    <footer className="bg-[#f8f8f8] text-gray-700 pt-10 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Snooze Eatery
          </h3>
          <p className="text-sm">
            Crafted with love, our dishes bring you the warmth of homemade meals
            with a gourmet twist.
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <a href="/specials" className="hover:underline">
                Snooze Special
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Contact Us</h4>
          <ul className="text-sm space-y-1">
            <li>📍 123 Food Street, Flavor Town</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@snoozeeatery.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4 text-xl text-gray-600">
            <a href="#" className="hover:text-[#ff5722]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-[#3b5998]">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-[#1da1f2]">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-[#c4302b]">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-200 pt-4 text-gray-500">
        © {new Date().getFullYear()} Snooze Eatery. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
