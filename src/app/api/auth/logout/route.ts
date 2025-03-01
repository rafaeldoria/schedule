import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'logout' as string;
    const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string
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
      
        (cookies()).delete(TOKEN_KEY)

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal error." }, { status: 500 });
    }
}