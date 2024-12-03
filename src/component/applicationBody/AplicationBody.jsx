import React from 'react';
import SideMenu from './sideMenu/SideMenu';
import DisplayData from './displayData/DisplayData';

const AplicationBody = () => {
    return (
        <div className="flex">
            {/* Side Menu */}
            <div className="fixed top-[75px] left-0 w-2/12 h-full bg-white shadow-lg ">
                <SideMenu />
            </div>

            {/* Main Content */}
            <div className="w-10/12 ml-[16.6667%] p-4">
                <DisplayData />
            </div>
        </div>
    );
};

export default AplicationBody;
