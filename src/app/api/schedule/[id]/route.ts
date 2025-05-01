import { NextResponse } from "next/server";

const uri_schedule = process.env.NEXT_PUBLIC_API_SCHEDULE + 'schedule' as string;

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Invalid request.", status: 401 });
        }

        const response = await fetch(`${uri_schedule}/${params.id}`, {
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

        return NextResponse.json({ schedule: ret.data, status: 200 });
    } catch (error) {
        console.log(error)
    }
}