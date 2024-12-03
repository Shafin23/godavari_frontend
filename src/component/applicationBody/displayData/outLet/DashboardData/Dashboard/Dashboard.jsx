import React, { useContext } from "react";
import { FaShip, FaBan } from "react-icons/fa"; // Example icons
import StatCard from "../statCard/StatCard";
import RevenueChart from "../RevenueChart/RevenueChart";
import { AppContext } from "../../../../../../AppProvider/AppProvider";
import DisplayDataHeading from "./DisplayDataHeading";




const Dashboard = () => {
    const { getTotalBookingsAndCancellations } = useContext(AppContext)

    return (
        <div>
            <DisplayDataHeading />
            <div className="  grid grid-cols-1 md:grid-cols-3 gap-4 ">
                {/* Stat Cards */}
                <div className="space-y-4">
                    <StatCard
                        title="Total Bookings"
                        value={getTotalBookingsAndCancellations?.totalBookings}
                        icon={<FaShip className="text-blue-500" />}
                        bgColor="bg-[#6ba7eb]"
                    />
                    <StatCard
                        title="Total Cancellations"
                        value={getTotalBookingsAndCancellations?.totalCancellations}
                        icon={<FaBan className="text-red-500" />}
                        bgColor="bg-[#ff6666]"
                    />
                </div>

                {/* Revenue Chart */}
                <div className="md:col-span-2">
                    <RevenueChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
