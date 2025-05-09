"use client"

import { useAuth } from "@/app/context/AuthContext";
import { Container } from "@/components/container";
import { Day } from "@/components/day";
import { Time } from "@/components/time";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

export default function Schedule( { params }: { params: { employeeId: string }} ) {
    const { authenticated } = useAuth()
    const [isVisible, setIsVisible] = useState(true)
    const employeeId = params.employeeId
    const [schedule, setSchedule] = useState<{ [date: string]: ScheduleDay}>({})
    
    useEffect(() => {
        async function getEmployeeSchedule() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/employee/${employeeId}`, {
                    method: 'GET',
                    credentials: 'include',
                    cache: 'no-store',
                    headers: {
                        "Authorization": `Bearer ${authenticated}`,
                        "Accept": "application/json",
                    }
                })

                const data = await response.json()
                setSchedule(data.schedule)
            } catch (error :any) {
                console.log(error)
            }
        }

        getEmployeeSchedule()
    }, [employeeId, authenticated]);
    

    async function generateSchedule() {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${authenticated}`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee/generate-schedule/${employeeId}`, {
                method: 'POST',
                credentials: 'include',
                headers: myHeaders,
            })
            const data = await response.json()

            if (data.status == 'error') {
                throw new Error(data.message)
            }

            setSchedule(data.schedule)
        } catch (error :any) {
            console.log(error)
        }
    }

    return (
        <Container>
            <section className="text-slate-200 text-3xl font-bold mb-3">
                <h2>EMPLOYEE SCHEDULE</h2>
            </section>
            {!schedule || Object.keys(schedule).length === 0 ? (
                <section className="flex items-center justify-between mb-2 text-slate-200">
                    <h1>
                        <p>Schedule not found</p>
                    </h1>
                    <button 
                        className="flex bg-blue-500 px-4 py-1 rounded text-white gap-2
                        hover:bg-blue-700 duration-300"
                        onClick={generateSchedule}
                    >
                        <IoIosAddCircle size={20} color="#E5E7EB"/>
                        Generate schedule
                    </button>
                </section>
            ) : (
                <div className="w-full max-w-7xl mx-auto px-2 py-4 mt-6 bg-slate-300 border-none rounded-md">
                    <div className="flex items-center justify-center">
                        {Object.entries(schedule).map(([date, details]) => {
                            if (!details || details.totalTimes === 0) {
                                return null;
                            }

                            return (
                                <section 
                                    key={date}
                                    className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 
                                        ${isVisible ? "flex" : "hidden"}
                                    md:flex`}
                                >
                                    <Day
                                        date={date}
                                        index={Object.keys(schedule).indexOf(date)}
                                    />

                                    {details.times && details.times.length > 0 && details.times.map((item, index) => (
                                        <Time
                                            key={`${date}-${index}`}
                                            time={item.time}
                                            status={item.status}
                                            date={date}
                                            employeeId={employeeId}
                                            scheduleDetailsId={item.scheduleDetailsId || ''}
                                        />
                                    ))}
                                </section>
                            );
                        })}
                    </div>
                </div>
            )}
        </Container>
    )
};
