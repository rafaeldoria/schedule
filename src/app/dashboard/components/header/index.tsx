import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full flex items-center bg-gray-300 my-4 gap-4 p-4 rounded">
                <Link href="/" className="text-gray-950 font-medium hover:font-bold duration-300">Schedules</Link>
                <Link href="/dashboard" className="text-gray-950 font-medium hover:font-bold duration-300">Employees</Link>
            </header>
        </Container>
    )
}