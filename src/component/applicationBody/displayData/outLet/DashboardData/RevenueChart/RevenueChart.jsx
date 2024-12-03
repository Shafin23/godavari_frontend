import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(3); // Default to last 3 months

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://godavari-xm9d.vercel.app/dashboard/getStatsForGraph?months=${filter}`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="p-4 bg-white rounded-2xl border">
      <div className="flex justify-between items-center mb-4 pb-4 border-b">
        <h4 className="text-lg font-bold">Total Revenue</h4>
        <select
          className="border rounded p-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(parseInt(e.target.value))}
        >
          <option value={3}>Last 3 Months</option>
          <option value={6}>Last 6 Months</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="cancellations" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
