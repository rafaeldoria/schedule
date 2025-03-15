import { Container } from "@/components/container";
import Link from "next/link";
import { NewEmployeeForm } from "../components/employeeForm";

export default function NewEmployee() {
    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">

                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="bg-white px-4 py-1 text-gray-800 rounded">
                        Back
                    </Link>

                    <h1 className="text-gray-300 text-3xl font-bold">New Employee</h1>
                </div>

                <NewEmployeeForm />

            </main>
        </Container>
    )
};
