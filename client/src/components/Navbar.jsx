import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-pink-100 to-yellow-400 via-orange-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
          LeetCode Tracker
        </div>

        {/* Links */}
        <div className="flex gap-6 text-lg">
          {[
            { name: "All Problems", path: "/" },
            { name: "Add Problem", path: "/add" },
            { name: "Due Today", path: "/due" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-roboto relative transition ${
                  isActive
                    ? "text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-yellow-400 after:via-orange-500 after:to-pink-500"
                    : "hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
