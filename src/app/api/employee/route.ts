import { NextResponse } from "next/server";

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'employee' as string;

export async function GET(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Invalid request.", status: 404 });
        }

        const response = await fetch(uri_schedule, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ error: data.message, status: response.status });
        }
      
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 404 });
    }
}

export async function POST(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Invalid request.", status: 401 });
        }

        const {
            fullName,
            email,
            _function,
        } = await request.json();

        if (!fullName || !_function) {
            return NextResponse.json({ error: "Failed to create employee.", status: 401 })
        }

        const response = await fetch(uri_schedule, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              "full_name": fullName,
              "email": email,
              "function": _function
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ error: data.message }, { status: response.status });
        }
      
        return NextResponse.json({ error: '', status: response.status });
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Invalid request." , status: 401 });
        }

        const {
            full_name: fullName,
            function: employeeFunction,
            email,
            available,
            id
        } = await request.json();

        if (!fullName || !employeeFunction || !email || !available || !id) {
            return NextResponse.json({ error: "Failed to update employee.", status: 401 })
        }

        const response = await fetch(`${uri_schedule}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              "full_name": fullName,
              "email": email,
              "function": employeeFunction,
              "available": available,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ error: data.message }, { status: response.status });
        }
      
        return NextResponse.json({ error: '', status: response.status });
    } catch (error) {
        console.log(error)
    }
}