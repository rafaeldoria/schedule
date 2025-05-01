"use client"

import { useAuth } from "@/app/context/AuthContext"
import { ModalContext } from "@/providers/scheduleModal"
import { CustomerProps } from "@/utils/customer.type"
import { EmployeeProps } from "@/utils/employee.type"
import { useContext, MouseEvent, useRef, useEffect, useState } from "react"

export function ModalSchedule() {
    const { handleModalVisible, dateTime, employeeId, scheduleDetailsId } = useContext(ModalContext)
    const { authenticated } = useAuth()
    const modalRef = useRef<HTMLDivElement | null>(null)
    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible()
        }
    }
    const [employee, setEmployee] = useState<EmployeeProps | null>(null)
    const [customer, setCustomer] = useState<CustomerProps | null>(null)

    useEffect(() => {
        async function getEmployee() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee/${employeeId}`, {
                    method: 'GET',
                    credentials: 'include',
                    cache: 'no-store',
                    headers: {
                        "Authorization": `Bearer ${authenticated}`,
                        "Accept": "application/json",
                    }
                })

                const data = await response.json()
                setEmployee(data.employee)
            } catch (error :any) {
                console.log(error)
            }
        }

        async function getCustomer() {
            if (scheduleDetailsId) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule-details/${scheduleDetailsId}`, {
                        method: 'GET',
                        credentials: 'include',
                        cache: 'no-store',
                        headers: {
                            "Authorization": `Bearer ${authenticated}`,
                            "Accept": "application/json",
                        }
                    })

                    const scheduleData = await response.json()

                    if (scheduleData.scheduleDetails.customer_id) {
                        const customerId = scheduleData.scheduleDetails.customer_id

                        const responseCustomer = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customer/${customerId}`, {
                            method: 'GET',
                            credentials: 'include',
                            cache: 'no-store',
                            headers: {
                                "Authorization": `Bearer ${authenticated}`,
                                "Accept": "application/json",
                            }
                        })

                        const customerData = await responseCustomer.json()

                        setCustomer(customerData.customer)
                    }
                } catch (error :any) {
                    console.log(error)
                }
            }
        }

        getEmployee()
        getCustomer()
    }, [employeeId, authenticated]);

    return (
        <div className="fixed inset-0 bg-gray-900/80 w-full min-h-screen" onClick={handleModalClick}>
            <div className="fixed inset-0 flex items-center justify-center">
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
                        <p>{employee ? employee.full_name : 'Loading...'}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email: </h2>
                        <p>{employee ? employee.email : 'Loading...'}</p>
                    </div>

                    <div className="w-full border-b-[1.5px] my-4"></div>

                    <h1 className="font-bold text-lg mb-4">Customer Details: </h1>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Date/Time: </h2>
                        <p>{dateTime}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Name: </h2>
                        <p>{customer ? customer.full_name : 'Loading...'}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email: </h2>
                        <p>{customer ? customer.email : 'Loading...'}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Phone: </h2>
                        <p>{customer ? customer.cellphone : 'Loading...'}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}