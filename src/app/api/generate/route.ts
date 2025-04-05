import { NextResponse } from 'next/server';

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'generate' as string;

export async function POST(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Invalid request.", status: 401 });
        }

        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: "Failed to generate new schedule." }, { status: 401 })
        }

        if (!body.recurrence || !body.startTime || !body.endTime || !body.duration) {
            return NextResponse.json({ error: "Failed to generate new schedule." }, { status: 401 })
        }

        const params = JSON.stringify({
            "recurrence": body.recurrence,
            "startTime": body.startTime,
            "endTime": body.endTime,
            "duration": body.duration,
            "interval": body.interval ?? 0,
            "saturdayOff": body.saturdayOff ?? false,
            ...(body.break && { break: body.break })
        });

console.log(params)
        const response = await fetch(uri_schedule, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: params,
        })
        
        const data = await response.json()
console.log(data.message)
        if (!response.ok) {
            return NextResponse.json({ error: data.message }, { status: response.status });
          }
      
        return NextResponse.json(data.data);
    } catch (error) {
        return NextResponse.json({ error: "Internal error." }, { status: 500 });
    }
}