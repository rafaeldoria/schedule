import { ModalContext } from "@/providers/scheduleModal";
import { useContext, useEffect, useState } from "react";

interface TimeProps {
    time: string;
    status: number;
    date: string;
    employeeId: string;
    scheduleDetailsId?: string;
}

export function Time({time, status, date, employeeId, scheduleDetailsId}: TimeProps) {
    const getStatusData = (status: number) => {
        const statusMap: Record<number, { color: string; statusDescription: string }> = {
            0: { color: "text-green-700", statusDescription: "OPEN" },
            1: { color: "text-blue-700", statusDescription: "SCHEDULED" },
            2: { color: "text-red-700", statusDescription: "CLOSED" },
        };
    
        return statusMap[status] || { color: "", statusDescription: "" }
    };

    const { handleModalVisible, handleDateTime, handleEmployeeId, handleScheduleDetailsId } = useContext(ModalContext)

    const [statusData, setDataStatus] = useState(getStatusData(status))

    const timeFormatted = time.split(":").slice(0, 2).join(":")

    function handleOpenModal() {
        handleModalVisible()
        handleDateTime(date + ' - ' + time)
        handleEmployeeId(employeeId)
        handleScheduleDetailsId(scheduleDetailsId || '')
    }

    return (
        <div
            className="flex flex-col items-center justify-center 
                border rounded-md border-blue-300 bg-white p-5 
                font-medium hover:bg-sky-100 duration-300"
        >

            <p>{timeFormatted}</p>

            <button 
                className={`text-sm ${statusData.color} `}
                onClick={handleOpenModal}
            >
                {statusData.statusDescription}
            </button>
        </div>
    )
}