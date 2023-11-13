"use client";
import React, { useState } from "react";

type NavbarProps = {
  children: React.ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <button onClick={toggleNav} className="md:hidden">
          <svg
            className="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex h-screen bg-gray-100">
        {isNavOpen && (
          <div
            onClick={toggleNav}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>
        )}

        <div
          className={`w-64 bg-gray-800 text-white p-4 fixed inset-y-0 left-0 transform ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="font-bold text-xl mb-4">Navigation</div>
          <ul>
            <li className="p-2 hover:bg-gray-600">Home</li>
            <li className="p-2 hover:bg-gray-600">About</li>
            <li className="p-2 hover:bg-gray-600">Services</li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
          <div className="p-4 font-bold text-xl">Navigation</div>
          <ul className="flex flex-col p-2">
            <li className="p-2 hover:bg-gray-600">Home</li>
            <li className="p-2 hover:bg-gray-600">About</li>
            <li className="p-2 hover:bg-gray-600">Services</li>
          </ul>
        </div>

        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
