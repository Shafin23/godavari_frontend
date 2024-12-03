import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { AppContext } from "../AppProvider/AppProvider";
import BookingDetailsModal from "../commonComponent/BookingDetailsModal/BookingDetailsModal";

// Modal to Confirm Booking Cancellation
const CancelBookingModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Cancel Booking
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel this booking? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal to Confirm Activity Status Change
const ActivityStatusModal = ({ isOpen, onClose, onConfirm, currentStatus }) => {
  if (!isOpen) return null;

  const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Change Activity Status to {newStatus}?
        </h2>
        <p className="text-gray-600 mb-6">
          {newStatus === "Active"
            ? "Marking the boat as 'Active' will make it available for bookings."
            : "Marking the boat as 'Inactive' will make it unavailable for bookings."}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Booking = ({ tableHeading, tableData, setTableData }) => {
  const { setDownloadingContent, setTrigger } = useContext(AppContext);
  const [isActivityModalOpen, setActivityModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    setDownloadingContent(tableData);
  }, [tableHeading, tableData, setDownloadingContent]);

  const requiredHeadingsForAction = ["Name", "Booking ID", "Boat Name", "No. of meals"];
  const requiredHeadingsForDetails = [
    "Name",
    "No. of Passenger",
    "Boat Name",
    "Journey Time",
    "Payment Type",
  ];
  const requiredHeadingsForDetails1 = [
    "Passenger Name",
    "No. of Passenger",
    "Boat Name",
    "Journey Time",
    "Payment Type",
  ];
  const requiredHeadingsForCancelledDetails = [
    "Name",
    "Booking ID",
    "Cancellation Reason",
    "Booking Date",
    "Refund Status",
  ];

  const shouldAddActionColumn = requiredHeadingsForAction.every((heading) =>
    tableHeading.includes(heading)
  );
  const shouldAddDetailsColumn =
    requiredHeadingsForDetails.every((heading) => tableHeading.includes(heading)) ||
    requiredHeadingsForCancelledDetails.every((heading) =>
      tableHeading.includes(heading)
    ) ||
    requiredHeadingsForDetails1.every((heading) => tableHeading.includes(heading));

  const openCancelModal = (row) => {
    setSelectedRow(row);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setSelectedRow(null);
    setCancelModalOpen(false);
  };

  const openActivityModal = (row) => {
    setSelectedRow(row);
    setActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setSelectedRow(null);
    setActivityModalOpen(false);
  };

  const handleCancelBooking = async () => {
    if (!selectedRow) return;

    try {
      const response = await fetch(
        `https://godavari-xm9d.vercel.app/booking/cancelBooking`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingID: selectedRow.Booking_ID }),
        }
      );

      if (response.ok) {
        const updatedTableData = tableData.filter(
          (item) => item.Booking_ID !== selectedRow.Booking_ID
        );
        setTableData(updatedTableData);
        setTrigger((prev) => !prev);
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      closeCancelModal();
    }
  };

  const handleActivityStatusChange = async () => {
    if (!selectedRow) return;

    const updatedStatus = selectedRow.Activity === "Active" ? "Inactive" : "Active";

    try {
      const response = await fetch(
        `https://godavari-xm9d.vercel.app/boat/updateActiveStatusOfBoat/${selectedRow._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: updatedStatus === "Active" }),
        }
      );

      if (response.ok) {
        const updatedRow = await response.json();
        const updatedTableData = tableData.map((item) =>
          item._id === updatedRow._id
            ? { ...item, Activity: updatedStatus }
            : item
        );
        setTableData(updatedTableData);
        setTrigger((prev) => !prev);
      } else {
        console.error("Failed to update activity status");
      }
    } catch (error) {
      console.error("Error updating activity status:", error);
    } finally {
      closeActivityModal();
    }
  };

  const handleViewDetails = async (bookingID) => {
    try {
      const response = await fetch(
        `https://godavari-xm9d.vercel.app/booking/getBookingById/${bookingID}`
      );
      if (response.ok) {
        const data = await response.json();
        setBookingDetails(data.data);
        setDetailsModalOpen(true);
      } else {
        console.error("Failed to fetch booking details");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setBookingDetails(null);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg w-full mt-5">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-white">
          <tr>
            {tableHeading?.map((item, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left font-bold text-gray-700 border border-gray-300"
              >
                {item}
              </th>
            ))}
            {shouldAddActionColumn && (
              <th className="px-6 py-4 text-left font-bold text-gray-700 border border-gray-300">
                Action
              </th>
            )}
            {shouldAddDetailsColumn && (
              <th className="px-6 py-4 text-left font-bold text-gray-700 border border-gray-300">
                Details
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 !== 0 ? "bg-white" : "bg-[#f2f7fd]"}`}
            >
              {tableHeading?.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 text-sm text-gray-800 border border-gray-300 ${column === "Activity"
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                    }`}
                >
                  {column === "Activity" ? (
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${row.Activity === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                          }`}
                      ></div>
                      <span>{row[column.split(" ").join("_")]}</span>
                      <FaPencilAlt
                        className="text-gray-500 hover:text-blue-500 text-xs cursor-pointer"
                        onClick={() => openActivityModal(row)}
                      />
                    </div>
                  ) : (
                    row[column.split(" ").join("_")]
                  )}
                </td>
              ))}
              {shouldAddActionColumn && (
                <td className="px-6 py-4 text-sm text-gray-800 border border-gray-300">
                  <FaTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => openCancelModal(row)}
                  />
                </td>
              )}
              {shouldAddDetailsColumn && (
                <td className="px-6 py-4 text-sm text-gray-800 border border-gray-300">
                  <button
                    className="bg-blue-500 text-white text-[13px] px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleViewDetails(row.Booking_ID)}
                  >
                    View Details
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cancel Booking Modal */}
      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={closeCancelModal}
        onConfirm={handleCancelBooking}
      />

      {/* Activity Status Modal */}
      <ActivityStatusModal
        isOpen={isActivityModalOpen}
        onClose={closeActivityModal}
        onConfirm={handleActivityStatusChange}
        currentStatus={selectedRow?.Activity}
      />

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={detailsModalOpen}
        onClose={closeDetailsModal}
        booking={bookingDetails}
      />
    </div>
  );
};

export default Booking;
