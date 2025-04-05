"use client"

import { ModalContext } from "@/providers/scheduleModal"
import { useContext, MouseEvent, useRef } from "react"

export function ModalSchedule() {
    const { handleModalVisible, dateTime } = useContext(ModalContext)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible()
        }
    }

    return (
        <div className="absolute bg-gray-900/80 w-full min-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl">Schedule Details</h1>
                        <button
                            onClick={handleModalVisible}
                            className="bg-red-500 p-1 px-2 text-white rounded"
                        >
                            Close
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Employee: </h2>
                        <p>Cláudio Antonio</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email: </h2>
                        <p>claudio@teste.com</p>
                    </div>

                    <div className="w-full border-b-[1.5px] my-4"></div>

                    <h1 className="font-bold text-lg mb-4">Customer Details: </h1>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Date/Time: </h2>
                        <p>{dateTime}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Name: </h2>
                        <p>Cláudio Antonio</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email: </h2>
                        <p>claudio@teste.com</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Phone: </h2>
                        <p>(31) 945614561</p>
                    </div>

                </div>
            </div>
        </div>
    )
}