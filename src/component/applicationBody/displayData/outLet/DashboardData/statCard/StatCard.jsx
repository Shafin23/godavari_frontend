import React from "react";

const StatCard = ({ 
    title, 
    value, 
    icon, 
    bgColor = "bg-blue-500", 
    textColor = "text-white" 
}) => {
    return (
        <div
            className={`p-4 rounded-2xl h-[167px] flex items-start justify-between shadow-md transform transition-all hover:scale-[102%] ${bgColor} ${textColor}`}
            style={{ minWidth: "150px" }} // Adjust width as needed
        >
            <div>
                <h4 className="text-[20px] font-medium">{title}</h4>
                <p className="text-[40px] font-bold">{value}</p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                {icon && <span className="text-blue-500">{icon}</span>}
            </div>
        </div>
    );
};

export default StatCard;
