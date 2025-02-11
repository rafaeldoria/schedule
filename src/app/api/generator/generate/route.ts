import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'generate' as string;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Failed to generate new schedule." }, { status: 401 })
        }

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", body.token);

        if (!body.recurrence || !body.startTime || !body.endTime || !body.duration) {
            return NextResponse.json({ error: "Failed to generate new schedule." }, { status: 401 })
        }

        let  params = {
            "recurrence": body.recurrence,
            "startTime": body.startTime,
            "endTime": body.endTime,
            "duration": body.duration,
            "interval": body.interval ?? 0,
            "saturdayOff": body.saturdayOff ?? false,
            ...(body.break && { break: body.break })
        };

        const response = await fetch(uri_schedule, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(params),
        })
        
        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ error: data.message }, { status: response.status });
          }
      
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal error." }, { status: 500 });
    }
}