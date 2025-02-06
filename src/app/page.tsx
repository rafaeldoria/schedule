"use client"

import { useState } from "react"

export default function Home() {
  const [page, setPage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

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
      <div className="w-full flex items-center px-2 py-4 bg-slate-400 h-2 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center text-white">
          SCHEDULE
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 py-4 mt-4 bg-red-300">
        <div className="flex items-center justify-center">
          <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 ${
              isVisible ? "hidden" : "flex"
            } md:flex  `}>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
              <p className="text-center">Monday </p>
              <p className="text-center">03/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:30</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>09:00</p>
              <button className="text-sm text-blue-700">SCHEDULED</button>
            </div>
          </section>

          <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 ${
            isVisible ? "hidden" : "flex"
          } md:flex  `}>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
              <p className="text-center">Tuesday </p>
              <p className="text-center">04/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:30</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>09:00</p>
              <button className="text-sm text-blue-700">SCHEDULED</button>
            </div>
          </section>

          <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 ${
            isVisible ? "hidden" : "flex"
          } md:flex  `}>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
              <p className="item-center">Wednesday </p>
              <p className="item-center">05/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:30</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>09:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
          </section>

          <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 ${
            isVisible ? "flex" : "hidden"
          } md:flex  `}>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
              <p className="text-center">Thursday </p>
              <p className="text-center">06/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:30</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>09:00</p>
              <button className="text-sm text-green-700">OPEN</button>
            </div>
          </section>

          <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 ${
            isVisible ? "flex" : "hidden"
          } md:flex  `}>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
            <p className="text-center">Friday </p>
            <p className="text-center">07/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:30</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>09:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
          </section>

          <section className={`flex-1 bg-blue-400 p-3 flex-col gap-4 ${
            isVisible ? "flex" : "hidden"
          } md:flex  `}>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-3">
              <p className="text-center">Saturday </p>
              <p className="text-center">08/04/2025 </p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
              <p>08:00</p>
              <button className="text-sm text-red-700">CLOSED</button>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md border-blue-300 bg-white p-5">
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
