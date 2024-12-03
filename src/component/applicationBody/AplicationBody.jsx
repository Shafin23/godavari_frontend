import React from 'react';
import SideMenu from './sideMenu/SideMenu';
import DisplayData from './displayData/DisplayData';

const AplicationBody = () => {
    return (
        <div className=' flex justify-between items-start w-full'>
            <div className=' w-2/12 '>
                <SideMenu />
            </div>
            <div className=' w-10/12'>
                <DisplayData />
            </div>
        </div>
    );
};

export default AplicationBody;