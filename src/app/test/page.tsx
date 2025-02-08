"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Page = () => {
    const [schedule, setSchedule] = useState<Record<string, { totalTimes: number; times: { time: string; status: number }[] }>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/schedule.json");
      const data = await response.json();
      setSchedule(data.data);
    };

    fetchData();
  }, []);

  return (
    <main>
        <div className="w-full flex items-center px-2 py-4 bg-slate-400 h-2 shadow-sm">
            <div className="w-full max-w-7xl mx-auto flex items-center text-white">
                SCHEDULE
            </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-2 py-4 mt-4 bg-red-300">
            <div className="flex items-center justify-center">
                {Object.entries(schedule).map(([date, details]) => (
                    <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 md:flex  `}>
                        <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
                            <p className="text-center">{dayjs(date).format("dddd")} </p>
                            <p className="text-center">{dayjs(date).format("DD/MM/YYYY")} </p>
                        </div>
                        {details.times.map((item, index) => (
                            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
                            <p key={index}>{item.time.split(":").slice(0, 2).join(":")}</p>
                            <button className={`text-sm ${item.status == 1 ? 'text-green-700' : 'text-red-700'} `}>{item.status == 1 ? 'OPEN' : 'CLOSED'}</button>
                          </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    </main>
  );
};

export default Page;
