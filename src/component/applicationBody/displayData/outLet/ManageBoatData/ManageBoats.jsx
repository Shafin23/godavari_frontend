import React, { useContext } from 'react';
import Booking from '../../../../../Tables/Booking';
import { AppContext } from '../../../../../AppProvider/AppProvider';
import Header from '../../../../../commonComponent/Header/Header';


const ManageBoats = ({ tableData, tableHeading }) => {
    const { headingText, downloadingContent } = useContext(AppContext)
    return (
        <div>
            <Header
                title={headingText}
                downloadingContent={downloadingContent}
            />
            <Booking tableHeading={tableHeading} tableData={tableData} />
        </div>
    );
};

export default ManageBoats;