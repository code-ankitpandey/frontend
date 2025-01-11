import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample tabs for the navbar
  const tabs = ["Home", "About", "Services", "Contact"];

  return (
    <nav className="bg-slate-600 text-white p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.jpg" alt="Logo" className="h-10 w-10 mr-4" />
          <span className="font-bold text-xl"></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {tabs.map((tab, index) => (
            <a key={index} href={`#${tab.toLowerCase()}`} className="hover:text-gray-300">
              {tab}
            </a>
          ))}
        </div>

        {/* Profile Icon and Hamburger Menu */}
        <div className="flex items-center space-x-6">
          {/* Profile Icon */}
          <div className="relative">
          <i className="fas fa-user-circle user-icon border-white" ></i>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-transparent text-white mt-4 py-2 px-4 text-right">
          {tabs.map((tab, index) => (
            <a key={index} href={`#${tab.toLowerCase()}`} className="block py-2 px-4 hover:bg-gray-700">
              {tab}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
