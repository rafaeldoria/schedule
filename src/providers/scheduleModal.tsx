"use client"

import { ModalSchedule } from "@/components/modal/schedule";
import { ScheduleDetailsProps } from "@/utils/scheduleDetail.type";
import { createContext, ReactNode, useState } from "react"

interface ModalContextData {
    visible: boolean;
    dateTime: string | undefined;
    employeeId: string | undefined;
    scheduleDetailsId: string | undefined;
    handleModalVisible: () => void;
    handleDateTime: (dateTime: string) => void;
    handleEmployeeId: (employeeId: string) => void;
    handleScheduleDetailsId: (scheduleDetailsId: string) => void;
}

export const ModalContext = createContext({} as ModalContextData)

export const ScheduleModalProvider = ({ children }: { children: ReactNode}) => {
    const [visible, setVisible] = useState(false)
    const [dateTime, setDateTime] = useState<string>()
    const [employeeId, setEmployeeId] = useState<string>()
    const [scheduleDetailsId, setScheduleDetailsId] = useState<string>()

    function handleModalVisible() {
        setVisible(!visible)
    }

    function handleDateTime(dateTime: string) {
        setDateTime(dateTime)
    }

    function handleEmployeeId(employeeId: string) {
        setEmployeeId(employeeId)
    }

    function handleScheduleDetailsId(scheduleDetailsId: string) {
        setScheduleDetailsId(scheduleDetailsId)
    }

    return (
        <ModalContext.Provider value={{
            visible,
            dateTime,
            employeeId,
            scheduleDetailsId,
            handleModalVisible,
            handleDateTime,
            handleEmployeeId,
            handleScheduleDetailsId,
        }}>
            {visible && <ModalSchedule />}
            {children}
        </ModalContext.Provider>
    )
}