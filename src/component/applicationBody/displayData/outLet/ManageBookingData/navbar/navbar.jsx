import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../../../AppProvider/AppProvider";

const Navbar = () => {
  const { setRoute } = useContext(AppContext);

  const basePath = "/ManageBookings"; // Define a fixed base path
  const navItems = [
    { label: "Bookings", path: "Bookings" },
    { label: "Cancelled Bookings", path: "CancelledBookings" },
    { label: "Insurance", path: "Insurance" },
    { label: "Tour Guide", path: "TourGuide" },
  ];

  const handleRoute = (path) => {
    const newRoute = `${basePath}/${path}`;
    setRoute(newRoute); // Assuming setRoute is used elsewhere
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <ul className="flex justify-start items-center space-x-6 px-6 py-3">
        {navItems.map(({ label, path }) => (
          <li key={path} className="relative">
            <NavLink
              to={`${basePath}/${path}`} // Construct route from the fixed base path
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors duration-300 pb-1 ${
                  isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600" : ""
                }`
              }
              onClick={() => handleRoute(path)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
