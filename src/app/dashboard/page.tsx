"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Header } from "@/components/header";
import { Time } from "@/components/time";
import { Day } from "@/components/day";
import { useAuth } from "../context/AuthContext";

const Page = () => {
  const [page, setPage] = useState(1)
  const [isVisible, setIsVisible] = useState(true)
  const [errorApi, setErrorApi] = useState<string>('')
  const [schedule, setSchedule] = useState<Record<string, { totalTimes: number; times: { time: string; status: number }[] }>>({});
  const { token } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'generate' as string;
      try {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer 4|TrfiutRp317m2MPNquZVGMpyycsqIKGAyWfaePesc73a58ab");

        const raw = JSON.stringify({
          "recurrence": 2,
          "startTime": "08:00:00",
          "endTime": "17:00:00",
          "duration": 30,
          "interval": 0,
          "break": [
            {
              "startBrake": "12:00:00",
              "endBrake": "13:00:00"
            },
            {
              "startBrake": "16:00:00",
              "endBrake": "16:30:00"
            }
          ],
          "saturdayOff": false
        });

        const response = await fetch(uri_schedule, {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        })
        let schedule = await response.json()

        if (schedule.error) {
          setErrorApi(schedule.message)
        }

        setSchedule(schedule.data);
      } catch(err: any) {
        setErrorApi(err.message)
      }
    };

    fetchData();
  }, []);

  function alterPage()
  {
    setIsVisible((prev) => !prev);
    if (page == 1) {
      setPage(2)
    } else {
      setPage(1)
    }
  }

  return (
    <main>
        <Header />

        <div className="w-full max-w-7xl mx-auto px-2 py-4 mt-6 bg-slate-300 border-none rounded-md">

          {errorApi != '' && <p className="text-xs text-red-500 mb-1">{errorApi}</p>}
          
          <div className="flex items-center justify-center">
          {Object.keys(schedule).length > 0 && 
            Object.entries(schedule).map(([date, details], index) => 
              details.totalTimes > 0 && (
                  <section 
                      key={date}
                      className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 
                          ${isVisible ? "flex" : "hidden"}
                        md:flex`}
                  >
                      <Day
                          date={date}
                          index={index}
                      />

                      {details.times.map((item, index) => (
                          <Time
                            key={`${date}-${index}`}
                            time={item.time}
                            status={item.status}
                          />
                      ))}
                  </section>
              )
          )}

          </div>

          {Object.keys(schedule).length > 3 && (
            <div className="mt-4 bg-slate-100 flex justify-end md:hidden">
              {page == 1 ? (
                <button className="text-slate-800 font-bold mr-2" onClick={alterPage}>NEXT</button>
              ) : (
                <button className="text-slate-800 font-bold mr-2" onClick={alterPage}>BACK</button>
              )}
            </div>
          )}    
          
        </div>
    </main>
  );
};

export default Page;
