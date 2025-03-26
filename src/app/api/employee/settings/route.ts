import { SettingsInterval } from "@/utils/employeeSetting.type";
import { NextResponse } from "next/server";

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'settings' as string;

export async function POST(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Invalid request.", status: 401 });
        }

        const {
            duration,
            start_time,
            end_time,
            intervalsArray,
            saturday_off,
            closeDaysArray,
            employeeId,
        } = await request.json();

        if (!duration || !start_time || !end_time || !employeeId) {
            return NextResponse.json({ error: "Failed to create settings employee.", status: 401 })
        }

        // const intervals = filterIntervals(intervalsArray);
        // console.log(intervalsArray)
        const closeDays = filterCloseDays(closeDaysArray);
        console.log(intervalsArray)
        // return NextResponse.json({ error: '', status: 200 });
        const response = await fetch(uri_schedule, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              "duration": duration,
              "start_time": start_time,
              "end_time": end_time,
              "intervals": intervalsArray,
              "saturday_off": saturday_off,
              "close_days": closeDays,
              "employee_id": employeeId,
            }),
        })

        const data = await response.json()
console.log(data)
        if (!response.ok) {
            return NextResponse.json({ error: data.message }, { status: response.status });
        }
      
        return NextResponse.json({ error: closeDays, status: response.status });
    } catch (error) {
        console.log(error)
    }
}

function filterIntervals(intervalsArray: Array<SettingsInterval>) {
    const validIntervals = intervalsArray.filter(interval => interval.start !== "" && interval.end !== "");
    return JSON.stringify(Object.assign({}, validIntervals));
}

function filterCloseDays(closeDaysArray: Array<number>) {
    if (closeDaysArray.length === 0) {
        return null
    }

    return closeDaysArray.join(',')
}