import React, { useContext } from "react";
import { AppContext } from "../../../../../AppProvider/AppProvider";
import Header from "../../../../../commonComponent/Header/Header";
import BoatPriceTable from "./BoatPriceTable";

const ManagePricing = ({ data }) => {
    const { headingText } = useContext(AppContext);

    

    return (
        <div>
            <Header
                title={headingText}
                downloadingContent={data} // Pass corrected data
                isPricingPdf={true}
            />
            <BoatPriceTable data={data} />
        </div>
    );
};

export default ManagePricing;
