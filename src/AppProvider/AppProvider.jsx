// src/context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loadData } from '../../utilityFunction/loadData';

// Create Context
export const AppContext = createContext();

const AppProvider = ({ children }) => {
    // Create state variables
    const [headingText, setHeadingText] = useState("Dashboard");
    const [route, setRoute] = useState("");


    // table data
    const [todaysBooking, setTodaysBooking] = useState(null);
    const [allBooking, setAllBooking] = useState(null)
    const [cancelledBooking, setCancelledBooking] = useState(null)
    const [getBookingsWithInsurance, setGetBookingsWithInsurance] = useState(null)
    const [getBookingsWithTourGuide, setGetBookingsWithTourGuide] = useState(null)
    const [getGrapghOfBookedSeat, setGetGrapghOfBookedSeat] = useState(null)
    const [getStatsForGraph, setGetStatsForGraph] = useState(null)
    const [getTotalBookingsAndCancellations, setGetTotalBookingsAndCancellations] = useState(null)
    const [getStatistics, setGetStatistics] = useState(null)
    const [getMealBoatViaDetails, setGetMealBoatViaDetails] = useState(null)
    const [getBookingOverview, setGetBookingOverview] = useState(null)
    const [getBoatsWithPrices, setGetBoatsWithPrices] = useState(null)
    const [getBoatList, setGetBoatList] = useState(null)
    const [downloadingContent, setDownloadingContent] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [trigger, setTrigger] = useState(false);

    // toggle options state 
    const [mealType, setMealType] = useState("veg")

    useEffect(() => {
        const baseUrl = 'https://godavari-xm9d.vercel.app';

        if (baseUrl) {
            loadData(`${baseUrl}/booking/getTodaysBookings`, setTodaysBooking);
            loadData(`${baseUrl}/booking/getBookingData?startDate=${startDate}?endDate=${endDate}`, setAllBooking);
            loadData(`${baseUrl}/booking/getCancelledBookings`, setCancelledBooking);
            loadData(`${baseUrl}/booking/getBookingsWithInsurance`, setGetBookingsWithInsurance);
            loadData(`${baseUrl}/booking/getBookingsWithTourGuide`, setGetBookingsWithTourGuide);
            loadData(`${baseUrl}/dashboard/getGraphOfBookedSeat`, setGetGrapghOfBookedSeat);
            loadData(`${baseUrl}/dashboard/getStatsForGraph`, setGetStatsForGraph);
            loadData(`${baseUrl}/dashboard/getTotalBookingsAndCancellations`, setGetTotalBookingsAndCancellations);
            loadData(`${baseUrl}/meal/getStatistics`, setGetStatistics);
            loadData(`${baseUrl}/meal/getMealBoatViaDetails`, setGetMealBoatViaDetails);
            loadData(`${baseUrl}/meal/getBookingOverview?mealType=${mealType}`, setGetBookingOverview);
            loadData(`${baseUrl}/pricing/getBoatsWithPrices`, setGetBoatsWithPrices);
            loadData(`${baseUrl}/boat/getBoatList`, setGetBoatList);

        } else {
            console.error('BASEURL is not defined in .env file.');
        }
    }, [mealType, trigger]);

    const data = {
        headingText,
        setHeadingText,
        route,
        setRoute,
        todaysBooking,
        allBooking,
        cancelledBooking,
        getBookingsWithInsurance,
        getBookingsWithTourGuide,
        getGrapghOfBookedSeat,
        getStatsForGraph,
        getTotalBookingsAndCancellations,
        getStatistics,
        getMealBoatViaDetails,
        getBookingOverview,
        getBoatsWithPrices,
        getBoatList,

        setStartDate,
        setEndDate,

        setMealType,
        setTrigger,

        downloadingContent,
        setDownloadingContent
    };

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
