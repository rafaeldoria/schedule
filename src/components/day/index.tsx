import dayjs from "dayjs";
import { useState } from "react";

interface DateProps {
    date: string;
    index: number;
}

export function Day({date, index}: DateProps) {
    const getColorTop = (index: number) => {
        const statusMap: Record<number, string> = {
            1: "bg-red-500",
            2: "bg-orange-500",
            3: "bg-amber-500",
            4: "bg-yellow-500",
            5: "bg-red-300",
            6: "bg-orange-200",
        };
    
        return statusMap[index] || ""
    };
    
    const [colorTop, setColorTop] = useState(getColorTop(index))

    return (
        <div className="relative flex flex-col items-center justify-center 
            font-medium border rounded-md border-blue-300 bg-white p-3"
        >

        <div className={`absolute top-0 left-0 w-full h-1 ${colorTop} rounded-t-md`}></div>
            <p className="text-center">{dayjs(date).format("dddd")} </p>
            <p className="text-center">{dayjs(date).format("DD/MM/YYYY")} </p>
        </div>
    )
}