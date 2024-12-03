import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { AppContext } from "../../AppProvider/AppProvider";

const Header = ({ title, downloadingContent, isPricingPdf }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setStartDate, setEndDate } = useContext(AppContext);

  // State for the date picker
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Function to handle date range selection
  const handleDateRangeChange = (ranges) => {
    const range = ranges.selection; // Use selection key
    if (range && range.startDate && range.endDate) {
      setSelectedDateRange({
        startDate: range.startDate,
        endDate: range.endDate,
        key: "selection",
      });
      setShowDateRangePicker(false); // Close the date picker

      // Update the context with the selected dates
      setStartDate(range.startDate);
      setEndDate(range.endDate);

      console.log("Selected Date Range:", range.startDate, range.endDate);
    } else {
      console.error("Invalid date range selected:", ranges);
    }
  };


  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    if (isPricingPdf) {
      // Add Title
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 153); // Blue color
      doc.setFont("helvetica", "bold");
      doc.text("Boat Pricing Details", 105, 20, { align: "center" });

      // Fetch and format pricing data
      downloadingContent.forEach((item) => {
        let yOffset = 30;

        // Boat Name
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        doc.setFont("helvetica", "bold");
        doc.text(`Boat Name: ${item.name}`, 14, yOffset);

        // Pricing Details
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const details = [
          `Adult Price: ${item.adult}`,
          `Child Price: ${item.child}`,
          `Private (4-seater) Price: ${item.privateCar_4seater}`,
          `Private (7-seater) Price: ${item.privateCar_7seater}`,
          `Shared Rides Price: ${item.shared_rides}`,
          `Breakfast Price: ${item.breakfast}`,
          `Veg Lunch Price: ${item.vegLunch}`,
          `Non-Veg Lunch Price: ${item.nonVegLunch}`,
          `Tour Guide Price: ${item.tourGuide}`,
          `Insurance Price: ${item.insurence}`,
        ];

        // Render details with compact spacing
        details.forEach((line, i) => {
          doc.text(line, 20, yOffset + 10 + i * 6); // Adjusted line height for tighter spacing
        });
      });

      doc.save("pricing-details.pdf");
    } else {
      // Fallback for traditional table data
      const headers = [];
      downloadingContent.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (!headers.includes(key) && key !== "_id") headers.push(key);
        });
      });

      const rows = downloadingContent.map((item) =>
        headers.map((header) => item[header] || "")
      );

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 20,
        theme: "grid",
        headStyles: { fillColor: [22, 121, 225] },
      });

      doc.save("data.pdf");
    }
  };


  const handleAddBoat = () => {
    navigate("/AddBoatForm");
  };

  return (
    <div className="flex items-center justify-between py-2 bg-white rounded-md mb-3 relative">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {/* Date Picker Button - Conditionally Render */}
        {title !== "Today's Bookings" && (
          <div className="relative">
            <button
              onClick={() =>
                setShowDateRangePicker((prevState) => !prevState)
              }
              className="text-sm px-4 py-2 bg-gray-100 border rounded-md hover:bg-gray-200"
            >
              {selectedDateRange.startDate.toLocaleDateString()} -{" "}
              {selectedDateRange.endDate.toLocaleDateString()}
            </button>

            {/* Date Range Picker */}
            {showDateRangePicker && (
              <div className="absolute z-50 bg-white shadow-md rounded-md right-0">
                <DateRangePicker
                  ranges={[selectedDateRange]}
                  onChange={handleDateRangeChange}
                  className="rounded-md"
                  moveRangeOnFirstSelection={false}
                />
              </div>
            )}
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={handleDownloadPDF}
          className="text-sm px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Download Data
        </button>

        {/* Add Boat Button */}
        {location.pathname === "/ManageBoats" && (
          <button
            onClick={handleAddBoat}
            className="text-sm px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Boat
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
