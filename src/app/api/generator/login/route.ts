import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'login' as string;

export async function POST(req: Request) {
    try {
        const {
            email,
            password
        } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Failed to signin." }, { status: 401 })
        }

        const response = await fetch(uri_schedule, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": email,
              "password": password
            }),
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