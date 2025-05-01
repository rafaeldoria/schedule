import { NextResponse } from "next/server";

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'employee' as string;

export async function GET(request: Request, { params }: { params: { employeeId: string } }) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return NextResponse.json({ error: "Invalid request.", status: 404 })
        }

        const employeeId = params.employeeId

        if (!employeeId) {
            return NextResponse.json({ error: "Failed to update employee.", status: 401 })
        }

        const response = await fetch(`${uri_schedule}/${employeeId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const ret = await response.json()

        if (!response.ok) {
            return NextResponse.json({ error: ret.message, status: response.status })
        }

        return NextResponse.json({ employee: ret.data.employee, settings: ret.data.settings, status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 404 })
    }
}