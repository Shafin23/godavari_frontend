import React, { useContext } from "react";
import Header from "../../../../../../commonComponent/Header/Header";
import { AppContext } from "../../../../../../AppProvider/AppProvider";
import Booking from "../../../../../../Tables/Booking";

const TableSection = () => {
  const { todaysBooking } = useContext(AppContext);
  console.log(todaysBooking);

  const tableHeading = [
    "Passenger Name",
    "No. of Passenger",
    "Boat Name",
    "Journey Time",
    "Payment Type",
  ];

  return (
    <div className="mb-24">
      {todaysBooking && todaysBooking.length > 0 ? (
        <>
          <Header title="Today's Bookings" downloadingContent={todaysBooking} />
          <Booking tableHeading={tableHeading} tableData={todaysBooking} />
        </>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-xl font-semibold">No bookings available for today.</p>
        </div>
      )}
    </div>
  );
};

export default TableSection;
