import React from "react";

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
    if (!isOpen || !booking) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-3/4 p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded p-2 focus:outline-none"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2 className="text-lg font-bold text-gray-800 mb-4">Passenger Info</h2>

                {/* Booking Info */}
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-800">Booking Info:</h3>
                    <p><strong>Booking ID:</strong> {booking.bookingID}</p>
                    <p><strong>Boat Name:</strong> {booking.boatName}</p>
                    <p><strong>Journey Time:</strong> {new Date(booking.date).toLocaleString()}</p>
                    <p><strong>Total Payment:</strong> ₹{booking.payment}</p>
                </div>

                {/* Passenger Info */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Passenger Info <span className="text-sm text-gray-500">({booking.passenger.length} Passengers)</span>
                    </h3>
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Phone No.</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Gender</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Age</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Meal Type</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Travel Vehicle</th>
                                <th className="px-4 py-2 border border-gray-300 text-left">Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking.passenger.map((passenger, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 !== 0 ? "bg-white" : "bg-gray-50"}`}
                                >
                                    <td className="px-4 py-2 border border-gray-300">{passenger.fullName || "N/A"}</td>
                                    <td className="px-4 py-2 border border-gray-300">{booking.phoneNumber || "N/A"}</td>
                                    <td className="px-4 py-2 border border-gray-300">{passenger.gender || "N/A"}</td>
                                    <td className="px-4 py-2 border border-gray-300">{passenger.age || "N/A"}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {booking.nonVegLunch > 0 ? (
                                            <span className="text-red-500">Non-veg</span>
                                        ) : booking.vegLunch > 0 ? (
                                            <span className="text-green-500">Veg</span>
                                        ) : (
                                            "None"
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {booking.privateCar_4seater ? "Private car (4 seater)" : 
                                         booking.privateCar_7seater ? "Private car (7 seater)" : 
                                         booking.shared_rides ? "Shared rides" : "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">{booking.paymentType || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsModal;
