import React from 'react';
import DisplayDataHeading from './outLet/DashboardData/Dashboard/displayDataHeading/displayDataHeading';
import { Outlet } from 'react-router-dom';

const DisplayData = () => {
    return (
        <div className=' w-full'>
            
            <div className=' p-6'>
                <Outlet />
            </div>
        </div>
    );
};

export default DisplayData;