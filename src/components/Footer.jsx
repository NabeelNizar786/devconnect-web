import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-base-300/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-white">ACME</h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Connecting people and building meaningful professional
              relationships worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                About Us
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Careers
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Press
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Support
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Follow Us
            </h3>
            <div className="mt-4 flex gap-4">
              {["Twitter", "YouTube", "Facebook"].map((platform) => (
                <button
                  key={platform}
                  className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:scale-110 transition"
                >
                  <span className="sr-only">{platform}</span>
                  {/* Replace with icons later */}
                  <div className="w-4 h-4 bg-gray-400 rounded-full" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} ACME Industries. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-white transition cursor-pointer">
              Terms
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;