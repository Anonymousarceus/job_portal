import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#6A38C2] text-white py-7">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* About Us */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            We are a leading job portal connecting job seekers with top
            employers. Our mission is to help you find your dream job.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Job Search</a></li>
            <li><a href="#" className="hover:underline">Employer Services</a></li>
            <li><a href="#" className="hover:underline">Resume Assistance</a></li>
            <li><a href="#" className="hover:underline">Career Advice</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2">
            <li>44/1 Juhi, Kanpur City</li>
            <li>Email: gamerakshatmishra@gmail.com</li>
            <li>Phone: 8765722855</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:col-span-1 lg:col-span-1">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6 md:mt-8 border-t border-gray-700 pt-2 md:pt-4">
        <p className="text-sm">&copy; 2024 Job Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
