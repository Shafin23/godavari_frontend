import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import SPA from "./spa/SPA";
import AppProvider, { AppContext } from "./AppProvider/AppProvider";
import DashboardData from "./component/applicationBody/displayData/outLet/DashboardData/DashboardData";
import ManageBooking from "./component/applicationBody/displayData/outLet/ManageBookingData/ManageBooking";
import Booking from "./Tables/Booking";
import ManageBoats from "./component/applicationBody/displayData/outLet/ManageBoatData/ManageBoats";
import AddBoatForm from "./component/applicationBody/displayData/outLet/ManageBoatData/AddBoatForm";
import ManageMeals from "./component/applicationBody/displayData/outLet/ManageMeals/ManageMeals";
import ManagePricing from "./component/applicationBody/displayData/outLet/ManagePricing/ManagePricing";

// Custom component to use context and configure routing dynamically
const AppRouter = () => {
  const { allBooking, cancelledBooking, getBookingsWithInsurance, getBoatList, getBookingOverview, getGraphOfBookedSeat, getMealBoatViaDetails, getBoatsWithPrices, getBookingsWithTourGuide } = useContext(AppContext); // Access context here

  const tableHeadingForAllBooking = ["Name", "No. of Passenger", "Boat Name", "Journey Time", "Payment Type"];
  const tableHeadingForCancelledBooking = ["Name", "Booking ID", "Cancellation Reason", "Booking Date", "Refund Status"];
  const tableHeadingBookingWithInsurence = ["Name", "Booking ID", "No. of Passenger", "Total Payment", "Payment Type", "Contact no."];
  const tableHeadingForBoat = ["Boat Name", "Total capacity", "Status", "Upcoming availability", "Activity", "Owners Contact"];
  const tableHeadingForMealOverview = ["Name", "Booking ID", "Boat Name", "No. of meals"];
  const tableHeadingForBoatVisaDetails = ["Boat Name", "No. of passengers", "Total Meals", "No. of Veg meals", "No. of Non-veg meals"];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SPA />,
      children: [
        {
          path: "/",
          element: <DashboardData />,
        },
        {
          path: "/ManageBookings",
          element: <ManageBooking />,
          children: [
            {
              path: "/ManageBookings/Bookings",
              element: (
                <Booking
                  tableData={allBooking}
                  tableHeading={tableHeadingForAllBooking}
                />
              ),
            },
            {
              path: "/ManageBookings/CancelledBookings",
              element: (
                <Booking
                  tableData={cancelledBooking}
                  tableHeading={tableHeadingForCancelledBooking}
                />
              ),
            },
            {
              path: "/ManageBookings/Insurance",
              element: (
                <Booking
                  tableData={getBookingsWithInsurance}
                  tableHeading={tableHeadingBookingWithInsurence}
                />
              ),
            },
            {
              path: "/ManageBookings/TourGuide",
              element: (
                <Booking
                  tableData={getBookingsWithTourGuide}
                  tableHeading={tableHeadingBookingWithInsurence}
                />
              ),
            }
          ],
        },
        {
          path: "/ManageBoats",
          element: <ManageBoats tableData={getBoatList} tableHeading={tableHeadingForBoat} />
        },
        {
          path: "/ManageMeals",
          element: <ManageMeals />,
          children: [
            {
              path: "/ManageMeals/Overview",
              element: (
                <Booking
                  tableData={getBookingOverview}
                  tableHeading={tableHeadingForMealOverview}
                />
              )
            },
            {
              path: "/ManageMeals/BoatViseDetails",
              element: (
                <Booking
                  tableData={getMealBoatViaDetails}
                  tableHeading={tableHeadingForBoatVisaDetails}
                />
              )
            }
          ]

        },
        {
          path: "/ManagePricing",
          element: <ManagePricing data={getBoatsWithPrices} />
        },
        {
          path: "/AddBoatForm",
          element: <AddBoatForm />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </AppProvider>
);
