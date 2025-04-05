"use client"

import { ModalSchedule } from "@/components/modal/schedule";
import { createContext, ReactNode, useState } from "react"

interface ModalContextData {
    visible: boolean;
    dateTime: string | undefined
    handleModalVisible: () => void;
    handleDateTime: (dateTime: string) => void
}

export const ModalContext = createContext({} as ModalContextData)

export const ScheduleModalProvider = ({ children }: { children: ReactNode}) => {
    const [visible, setVisible] = useState(false)
    const [dateTime, setDateTime] = useState<string>()

    function handleModalVisible() {
        setVisible(!visible)
    }

    function handleDateTime(dateTime: string) {
        setDateTime(dateTime)
    }

    return (
        <ModalContext.Provider value={{
            visible,
            dateTime,
            handleModalVisible,
            handleDateTime,
        }}>
            {visible && <ModalSchedule />}
            {children}
        </ModalContext.Provider>
    )
}