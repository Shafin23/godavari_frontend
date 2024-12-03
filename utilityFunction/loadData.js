import axios from 'axios';

// Common function to load data
export const loadData = async (url, setData) => {
    try {
        const response = await axios.get(url); // Fetch data using Axios
        setData(response.data.data);          // Update state with fetched data
    } catch (error) {
        console.error(`Error loading data from ${url}:`, error);
    }
};

