import { useEffect, useState } from "react";

interface TimeProps {
    time: string;
    status: number;
}

export function Time({time, status}: TimeProps) {
    const getStatusData = (status: number) => {
        const statusMap: Record<number, { color: string; statusDescription: string }> = {
            1: { color: "text-green-700", statusDescription: "OPEN" },
            2: { color: "text-red-700", statusDescription: "CLOSED" },
            3: { color: "text-blue-700", statusDescription: "SCHEDULED" },
        };
    
        return statusMap[status] || { color: "", statusDescription: "" }
    };

    const [statusData, setDataStatus] = useState(getStatusData(status))

    const timeFormatted = time.split(":").slice(0, 2).join(":")

    return (
        <div
            className="flex flex-col items-center justify-center 
                border rounded-md border-blue-300 bg-white p-5 
                font-medium hover:bg-sky-100 duration-300"
        >

            <p>{timeFormatted}</p>

            <button className={`text-sm ${statusData.color} `}>{statusData.statusDescription}</button>
        </div>
    )
}