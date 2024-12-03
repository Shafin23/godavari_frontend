import React, { useContext } from 'react';
import Navbar from './navbar/navbar';
import { Outlet } from 'react-router-dom';
import Header from '../../../../../commonComponent/Header/Header';
import { AppContext } from '../../../../../AppProvider/AppProvider';

const ManageBooking = () => {
    const {headingText, downloadingContent} = useContext(AppContext)
    return (
        <div>
            <Header
                title={headingText}
                downloadingContent={downloadingContent}
            />
            <Navbar />
            <Outlet />
        </div>
    );
};

export default ManageBooking;