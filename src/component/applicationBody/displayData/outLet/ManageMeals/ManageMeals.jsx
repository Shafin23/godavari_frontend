import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import { AppContext } from '../../../../../AppProvider/AppProvider';
import Navbar from './Navbar';
import Header from '../../../../../commonComponent/Header/Header';
import StatCard from '../DashboardData/statCard/StatCard';
import { FaShip } from 'react-icons/fa';

const ManageMeals = () => {
    const { headingText, downloadingContent, setMealType, getStatistics } = useContext(AppContext);
    const location = useLocation(); // Get the current location object
    console.log(getStatistics)
    const mealOption = ['veg', 'nonVeg'];

    return (
        <div>
            <Header
                title={headingText}
                downloadingContent={downloadingContent}
            />
            <Navbar />
            <div className='grid grid-cols-3 gap-4 items-center my-8 '>
                <StatCard
                    title="Total Meals"
                    value={getStatistics?.totalMeal}
                    icon={<FaShip className="text-blue-500" />}
                    bgColor="bg-[#ff6666]"
                />
                <StatCard
                    title="Total Veg meals"
                    value={getStatistics?.veg}
                    icon={<FaShip className="text-blue-500" />}
                    bgColor="bg-[#b3ffb3]"
                    textColor="text-black"
                />
                <StatCard
                    title="Total Non-veg meals"
                    value={getStatistics?.noVeg}
                    icon={<FaShip className="text-blue-500" />}
                    bgColor="bg-[#fee795]"
                    textColor='text-black'
                />
            </div>

            <hr />

            {/* Conditionally render the dropdown */}
            {location.pathname === '/ManageMeals/Overview' && (
                <div className="my-4">
                    <label
                        htmlFor="mealType"
                        className="block text-lg font-semibold text-gray-800 mb-2"
                    >
                        Select Meal Type:
                    </label>
                    <div className="relative w-1/3">
                        <select
                            id="mealType"
                            onChange={(e) => setMealType(e.target.value)}
                            className="block w-full p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-all appearance-none"
                        >
                            <option value="" disabled selected>
                                Choose a meal type
                            </option>
                            {mealOption.map((option) => (
                                <option key={option} value={option}>
                                    {option === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                                </option>
                            ))}
                        </select>
                        <div className="absolute top-0 right-0 mt-3 mr-3 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <Outlet />
        </div>
    );
};

export default ManageMeals;
