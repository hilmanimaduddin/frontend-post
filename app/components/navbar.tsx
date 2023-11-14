"use client";
import Link from "next/link";
import React, { useState } from "react";

type NavbarProps = {
  children: React.ReactNode;
};

const NavbarNew = ({ children }: NavbarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50">
        <div className="text-xl font-bold p-3"></div>
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
      <div className="flex h-screen">
        {isNavOpen && (
          <div
            onClick={toggleNav}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>
        )}

        <div
          style={{
            display: isNavOpen ? "block" : "none",
            zIndex: 50,
            position: "fixed",
            // top: 0,
            // left: 0,
            height: "100%",
          }}
          className={`w-64 bg-gray-800 text-white p-4 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <ul>
            <Link href="/">
              <li className="p-2 hover:bg-gray-600">Home</li>
            </Link>
            <Link href={"/user"}>
              <li className="p-2 hover:bg-gray-600">User</li>
            </Link>
            <Link href={"/password"}>
              <li className="p-2 hover:bg-gray-600">Change Password</li>
            </Link>
            <Link href={"/post"}>
              <li className="p-2 hover:bg-gray-600">Post</li>
            </Link>
          </ul>
        </div>

        <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
          <ul className="flex flex-col p-2 mt-12">
            <Link href={"/"}>
              <li className="p-2 hover:bg-gray-600">Home</li>
            </Link>
            <Link href={"/user"}>
              <li className="p-2 hover:bg-gray-600">User</li>
            </Link>
            <Link href={"/password"}>
              <li className="p-2 hover:bg-gray-600">Change Password</li>
            </Link>
            <Link href={"/post"}>
              <li className="p-2 hover:bg-gray-600">Post</li>
            </Link>
          </ul>
        </div>

        <div className="flex-grow p-4 overflow-y-auto mt-16">{children}</div>
      </div>
    </div>
  );
};

export default NavbarNew;
