import React, { useContext, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { AppContext } from "../../../../../AppProvider/AppProvider";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

// Main BoatPriceTable Component
const BoatPriceTable = ({ data, onUpdateSuccess }) => {
    const { setTrigger } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentBoat, setCurrentBoat] = useState(null);
    const [currentField, setCurrentField] = useState("");
    const [currentValue, setCurrentValue] = useState("");

    const handlePencilClick = (boat, field, value) => {
        setCurrentBoat(boat); // Set the boat being edited
        setCurrentField(field); // Set the field being edited
        setCurrentValue(value); // Set the current value for the modal input
        setModalOpen(true); // Open the modal
    };

    const handleInputChange = (e) => {
        setCurrentValue(e.target.value); // Update the value being edited
    };

    const handleSaveChanges = async () => {
        if (currentBoat && currentField) {
            console.log(currentBoat);
            try {
                // Make PUT request
                const response = await fetch(
                    `https://godavari-xm9d.vercel.app/pricing/updatePrice/${currentBoat._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            priceField: currentField,
                            newValue: currentValue,
                        }),
                    }
                );

                const result = await response.json();

                if (response.ok && result.success) {
                    alert("Price updated successfully!");
                    setTrigger((prev) => !prev);
                    if (onUpdateSuccess) {
                        onUpdateSuccess(currentBoat.id, currentField, currentValue);
                    }
                } else {
                    alert(`Failed to update price: ${result.message}`);
                }
            } catch (error) {
                console.error("Error updating price:", error);
                alert("An error occurred while updating the price. Please try again.");
            }
        }

        setModalOpen(false); // Close the modal
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-3 text-left">Boat Name</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Passenger</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Meals</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Transportation</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Extras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((boat, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            >
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                    {boat.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span>Adult: ₹{boat.adult}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(boat, "adult", boat.adult)
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <span>Kids: ₹{boat.child}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(boat, "child", boat.child)
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span>Pure Veg: ₹{boat.vegLunch}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(boat, "vegLunch", boat.vegLunch)
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <span>Non-veg: ₹{boat.nonVegLunch}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(
                                                        boat,
                                                        "nonVegLunch",
                                                        boat.nonVegLunch
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span>
                                                Private (4-seater): ₹{boat.privateCar_4seater}
                                            </span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(
                                                        boat,
                                                        "privateCar_4seater",
                                                        boat.privateCar_4seater
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <span>
                                                Private (7-seater): ₹{boat.privateCar_7seater}
                                            </span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(
                                                        boat,
                                                        "privateCar_7seater",
                                                        boat.privateCar_7seater
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <span>Shared Rides: ₹{boat.shared_rides}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(
                                                        boat,
                                                        "shared_rides",
                                                        boat.shared_rides
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span>Tour Guide: ₹{boat.tourGuide}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(boat, "tourGuide", boat.tourGuide)
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <span>Insurance: ₹{boat.insurence}</span>
                                            <FaPencilAlt
                                                className="ml-2 text-gray-500 text-sm cursor-pointer hover:text-blue-500 transition"
                                                onClick={() =>
                                                    handlePencilClick(boat, "insurence", boat.insurence)
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Edit Charges</h2>
                <p className="text-gray-600 mb-4">
                    Update the {currentField.replace(/_/g, " ")} charge.
                </p>
                <input
                    type="number"
                    value={currentValue}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
                >
                    Save Changes
                </button>
            </Modal>
        </div>
    );
};

export default BoatPriceTable;
