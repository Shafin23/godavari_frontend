import React, { useState, useEffect } from 'react';

const CircularProgress = ({ percentage, label, color, emptyPartColor }) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    
    useEffect(() => {
        // Only start animating if percentage changes
        const increment = percentage / 100;
        const interval = setInterval(() => {
            setCurrentPercentage((prev) => {
                const nextPercentage = Math.min(prev + increment, percentage);
                if (nextPercentage >= percentage) {
                    clearInterval(interval); // Stop the animation once the target percentage is reached
                }
                return nextPercentage;
            });
        }, 20); // Adjust time (in ms) for smoothness
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [percentage]);

    return (
        <div className="flex flex-col items-center pb-3">
            <div
                className="relative w-40 h-40 rounded-full"
                style={{
                    background: `conic-gradient(${color} ${currentPercentage * 3.6}deg, ${emptyPartColor} ${currentPercentage * 3.6}deg)`
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full m-8">
                    <span className="text-xl text-gray-700 font-bold">{Math.round(currentPercentage)}%</span>
                </div>
            </div>
            <p className="mt-5 font-semibold text-gray-600">{label}</p>
        </div>
    );
};

export default CircularProgress;
