import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'logout' as string;

export async function POST(request: Request) {
    try {
        const {
            token,
        } = await request.json();

        const response = await fetch(uri_schedule, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
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