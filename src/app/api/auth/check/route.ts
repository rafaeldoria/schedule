import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string
    const cookieStore = await cookies()

    return NextResponse.json({ authenticated: cookieStore.get(TOKEN_KEY)?.value, status: 200 })
}