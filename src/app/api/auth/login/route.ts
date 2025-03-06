import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'login' as string;
    const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string

    try {
        const {
            email,
            password
        } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Failed to signin.", status: 401 })
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
            return NextResponse.json({ error: data.message, status: response.status });
        }

        const cookieStore = await cookies()
        cookieStore.set({
            name: TOKEN_KEY,
            value: data.token,
            maxAge: 60 * 60 * 24,
        })
      
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal error.", status: 500 });
    }
}