import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../../AppProvider/AppProvider";

const Navbar = () => {
  const { setRoute } = useContext(AppContext);

  const basePath = "/ManageMeals"; // Define a fixed base path
  const navItems = [
    { label: "Overview", path: "Overview" },
    { label: "Boat vise details", path: "BoatViseDetails" },
  ];

  const handleRoute = (path) => {
    const newRoute = `${basePath}/${path}`;
    setRoute(newRoute); // Assuming setRoute is used elsewhere
  };

  return (
    <nav className="w-full bg-white shadow-lg">
      <ul className="flex justify-start items-center space-x-6 px-6 py-4">
        {navItems.map(({ label, path }) => (
          <li key={path} className="relative">
            <NavLink
              to={`${basePath}/${path}`} // Construct route from the fixed base path
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-all duration-300 pb-2 ${
                  isActive
                    ? "font-semibold text-blue-600 border-b-2 border-blue-600"
                    : ""
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
