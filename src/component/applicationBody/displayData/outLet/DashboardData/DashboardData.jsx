import React from 'react';
import StatCard from './statCard/StatCard';
import Dashboard from './Dashboard/Dashboard';
import BookedSeats from './pieChartContainer/BookedSeats/BookedSeats';
import TableSection from './tableSection/TableSection';

const DashboardData = () => {
    return (
        <div>
            <Dashboard />
            <hr className=' my-8 border border-dashed bg-gray-500' />
            <BookedSeats />
            <hr className=' my-8 border border-dashed bg-gray-500' />
            <TableSection />
        </div>
    );
};

export default DashboardData;