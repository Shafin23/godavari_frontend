export const formatTimeRange = (dateString) => {
    const date = new Date(dateString);

    // Extract the hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format time as "07:00 am"
    const formatTime = (h, m) => {
        const period = h >= 12 ? 'pm' : 'am';
        const formattedHours = h % 12 === 0 ? 12 : h % 12;
        const formattedMinutes = m < 10 ? `0${m}` : m;
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    // Determine the time period (Morning, Afternoon, etc.)
    const timePeriod = hours < 12 ? 'Morning' : (hours < 18 ? 'Afternoon' : 'Evening');

    // Define default time ranges based on the period
    let startTime, endTime;
    if (timePeriod === 'Morning') {
        startTime = formatTime(7, 0); // Morning start at 7:00 AM
        endTime = formatTime(9, 0);   // Morning end at 9:00 AM
    } else if (timePeriod === 'Afternoon') {
        startTime = formatTime(12, 0); // Afternoon start at 12:00 PM
        endTime = formatTime(14, 0);   // Afternoon end at 2:00 PM
    } else {
        startTime = formatTime(18, 0); // Evening start at 6:00 PM
        endTime = formatTime(20, 0);   // Evening end at 8:00 PM
    }

    return `${timePeriod} (${startTime} - ${endTime})`;
};



