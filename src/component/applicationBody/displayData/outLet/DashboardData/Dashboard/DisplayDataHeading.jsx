import React, { useContext } from 'react';
import { AppContext } from '../../../../../../../AppProvider/AppProvider';

const DisplayDataHeading = () => {
    const {headingText} = useContext(AppContext)
    return (
        <div className=' border-b px-6 pt-4 pb-5 mb-7'>
            <h1 className=' text-[22px] font-semibold text-gray-800'>{headingText}</h1>
        </div>
    );
};

export default DisplayDataHeading;