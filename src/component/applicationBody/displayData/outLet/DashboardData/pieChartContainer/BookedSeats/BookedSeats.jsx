import React, { useContext, useState } from 'react';
import CircularProgress from '../CircularProgress/CircularProgress';
import { AppContext } from '../../../../../../../AppProvider/AppProvider';

const BookedSeats = () => {
    const { getGrapghOfBookedSeat } = useContext(AppContext);
    const itemsPerPage = 4; // Number of items to show at a time
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current start index

    const totalItems = getGrapghOfBookedSeat?.length || 0;

    // Get the items to display
    const currentItems = getGrapghOfBookedSeat?.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0)); // Move back
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            Math.min(prev + itemsPerPage, totalItems - itemsPerPage)
        ); // Move forward
    };

    return (
        <div className="p-4 bg-white border my-5 rounded-2xl">
            <h2 className="mb-4 text-[22px] font-semibold text-gray-800">Booked Seats</h2>
            <div className="overflow-hidden relative">
                {/* Carousel Wrapper */}
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
                    }}
                >
                    {getGrapghOfBookedSeat?.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-1/4 flex justify-center"
                            style={{ flexBasis: '25%' }}
                        >
                            <CircularProgress
                                percentage={item.bookedPercentage}
                                label={item.boatName}
                                color={item.color}
                                emptyPartColor={item.emptyPartColor}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`px-4 py-2 rounded-md text-white transition ${
                        currentIndex === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#1e79e1] hover:bg-[#4b8dd9]'
                    }`}
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    {Math.ceil(currentIndex / itemsPerPage) + 1} of{' '}
                    {Math.ceil(totalItems / itemsPerPage)}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentIndex + itemsPerPage >= totalItems}
                    className={`px-4 py-2 rounded-md text-white transition ${
                        currentIndex + itemsPerPage >= totalItems
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#1e79e1] hover:bg-[#4b8dd9]'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookedSeats;
