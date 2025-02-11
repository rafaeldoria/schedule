"use client"

import { useState } from "react"

export default function Home() {
  const [page, setPage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [schedule, setSchedule] = useState<Record<string, { totalTimes: number; times: { time: string; status: number }[] }>>({});

  function alterPage()
  {
    setIsVisible((prev) => !prev);
    if (page == 1) {
      setPage(2)
    } else {
      setPage(1)
    }
    
  }

  async function handleGetSchedule() {
    const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'generate' as string;
    try {
      const response = await fetch('api/auth/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'token': '',
          'recurrence': '',
          'startTime': '',
          'endTime': '',
          'duration': '',
          'interval': '',
          'saturdayOff': '',
        }),
      })
      let schedule = await response.json()

      console.log(schedule)
      setSchedule(schedule.data);
    } catch(err) {
      console.log(err)
    }
  }

  async function handleRegister() {
    try {
        const response = await fetch('api/auth/register', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            'name': '',
            'email': '',
            'password': ''
          }),
        })

        const data = await response.json();
        console.log(data)
    } catch(err: any) {
      console.log(err)
    }
  }

  async function handleLogin() {
    const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'login' as string;
    try {
      const response = await fetch('api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            'email': '',
            'password': ''
          }),
        })

        const data = await response.json();
        console.log(data)
        // "4|TrfiutRp317m2MPNquZVGMpyycsqIKGAyWfaePesc73a58ab"
    } catch(err: any) {
      console.log(err)
    }
  }

  return (
    <main>
      <div className="w-full flex items-center px-2 py-4 bg-slate-400 h-2 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center text-white">
          SCHEDULE
        </div>
        <div>
          <button className="text-white" onClick={handleLogin}>LOGIN | </button>
        </div>
        <div>
          <button className="text-white" onClick={handleGetSchedule}>| SCHEDULE</button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 py-4 mt-4 bg-slate-300 border-none rounded-md">
        <div className="flex items-center justify-center">
          <section className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 ${
              isVisible ? "hidden" : "flex"
            } md:flex  `}>
            <div className="relative flex flex-col items-center justify-center font-medium border rounded-md border-blue-300 bg-white p-3">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded-t-md"></div>
              <p className="text-center">Monday</p>
              <p className="text-center">03/04/2025</p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:30</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>09:00</p>
              <button className="text-sm text-blue-700">SCHEDULED</button>
            </div>
          </section>

          <section className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 ${
            isVisible ? "hidden" : "flex"
          } md:flex  `}>
            <div className="relative flex flex-col items-center justify-center font-medium border rounded-md border-blue-300 bg-white p-3">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 rounded-t-md"></div>
              <p className="text-center">Tuesday </p>
              <p className="text-center">04/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:30</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>09:00</p>
              <button className="text-sm text-blue-700">SCHEDULED</button>
            </div>
          </section>

          <section className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 ${
            isVisible ? "hidden" : "flex"
          } md:flex  `}>
            <div className="relative flex flex-col items-center justify-center font-medium border rounded-md border-blue-300 bg-white p-3">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 rounded-t-md"></div>
              <p className="item-center">Wednesday </p>
              <p className="item-center">05/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:30</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>09:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
          </section>

          <section className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 ${
            isVisible ? "flex" : "hidden"
          } md:flex  `}>
            <div className="relative flex flex-col items-center justify-center font-medium border rounded-md border-blue-300 bg-white p-3">
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 rounded-t-md"></div>
              <p className="text-center">Thursday </p>
              <p className="text-center">06/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:30</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>09:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
          </section>

          <section className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 ${
            isVisible ? "flex" : "hidden"
          } md:flex  `}>
            <div className="relative flex flex-col items-center justify-center font-medium border rounded-md border-blue-300 bg-white p-3">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-300 rounded-t-md"></div>
              <p className="text-center">Friday </p>
              <p className="text-center">07/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:30</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>09:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
          </section>

          <section className={`flex-1 bg-sky-200 p-2 flex-col gap-2 shadow-md rounded-md mx-1 ${
            isVisible ? "flex" : "hidden"
          } md:flex  `}>
            <div className="relative flex flex-col items-center justify-center font-medium border rounded-md border-blue-300 bg-white p-3">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-200 rounded-t-md"></div>
              <p className="text-center">Saturday </p>
              <p className="text-center">08/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5 font-medium hover:bg-sky-100 duration-300">
              <p>08:30</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col  items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>09:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
          </section> 
        </div>

        <div className="mt-4 bg-slate-100 flex justify-end md:hidden">
        {page == 1 ? (
           <button className="text-slate-800 font-bold mr-2" onClick={alterPage}>NEXT</button>
        ) : (
          <button className="text-slate-800 font-bold mr-2" onClick={alterPage}>BACK</button>
        )}
        </div>
        
      </div>
      
    </main>
  );
}
