import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider/AppProvider'; // Import the AppContext
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const { headingText, setHeadingText, setRoute } = useContext(AppContext); // Access context values
    const navigate = useNavigate();

    // Function to handle click on menu items
    const handleItemClick = (text) => {
        setHeadingText(text); // Set the heading text to the clicked item text

        // Define the base route and subpath logic
        const baseRoute = text === "Dashboard" ? "" : text.split(' ').join('');
        const subPath =
            baseRoute === "ManageBookings"
                ? "/Bookings"
                : baseRoute === "ManageMeals"
                ? "/Overview"
                : "";

        // Combine base route and subpath
        const fullRoute = `/${baseRoute}${subPath}`;

        // Update the route context
        setRoute(fullRoute);

        // Navigate to the new route
        navigate(fullRoute);
    };

    return (
        <div className="h-[100vh] pt-3 pb-3 ps-8 pe-3 border-r ">
            <ul className="space-y-4">
                {/* Menu Items */}
                {[
                    'Dashboard',
                    'Manage Bookings',
                    'Manage Boats',
                    'Manage Meals',
                    'Manage Pricing',
                ].map((item) => (
                    <li
                        key={item}
                        className={`text-lg cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                            headingText === item
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
                        }`}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenu;
