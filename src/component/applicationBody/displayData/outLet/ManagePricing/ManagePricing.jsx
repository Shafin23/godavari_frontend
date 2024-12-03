import React, { useContext } from "react";
import { AppContext } from "../../../../../AppProvider/AppProvider";
import Header from "../../../../../commonComponent/Header/Header";
import BoatPriceTable from "./BoatPriceTable";

const ManagePricing = ({ data }) => {
    const { headingText } = useContext(AppContext);

    // Correctly transform data for the Header component
    const transformedData = data?.map((boat) => ({
        name: boat.name || "-",
        adult: boat.adult || "₹0",
        child: boat.child || "₹0",
        privateCar_4seater: boat.privateCar_4seater || "₹0",
        privateCar_7seater: boat.privateCar_7seater || "₹0",
        shared_rides: boat.shared_rides || "₹0",
        breakfast: boat.breakfast || "₹0",
        vegLunch: boat.vegLunch || "₹0",
        nonVegLunch: boat.nonVegLunch || "₹0",
        tourGuide: boat.tourGuide || "₹0",
        insurence: boat.insurence || "₹0",
    }));

    return (
        <div>
            <Header
                title={headingText}
                downloadingContent={transformedData} // Pass corrected data
            />
            <BoatPriceTable data={data} />
        </div>
    );
};

export default ManagePricing;
