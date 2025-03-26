import { Container } from "@/components/container";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { EmployeeProps } from "@/utils/employee.type";
import { cookies } from 'next/headers'
import { ListEmployee } from "./employee/components/list";
import { AuthLogout } from "../auth/components/logout";

export default async function Dashboard() {
    const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string
    const cookieStore = cookies()
    const storedToken = cookieStore.get(TOKEN_KEY)?.value

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Accept": "application/json",
        }
    })
    const data = await response.json()

    const employees = data.employees ?? []

    return (
        <Container>
            {data.status === 401 && (
                <AuthLogout />
            )}
            <main className="text-slate-200">

                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold">Employees</h1>
                    <div className="flex items-center gap-3">
                        <Link href='/dashboard/employee/new' className="flex bg-blue-500 px-4 py-1 rounded text-white gap-2
                            hover:bg-blue-700 duration-300">
                            <IoIosAddCircle size={20} color="#E5E7EB"/>
                            New employee
                        </Link>
                    </div>
                </div>

                {Array.isArray(employees) && employees.length > 0 ? (
                    <table className="min-w-full my-2 table-fixed border-separate border-spacing-y-1">
                        <thead>
                            <tr>
                                <th className="font-medium text-left pl-1 w-1/4">EMPLOYEE</th>
                                <th className="font-medium text-left hidden sm:table-cell w-1/4">FUNCTION</th>
                                <th className="font-medium text-left hidden sm:table-cell w-1/4">EMAIL</th>
                                <th className="font-medium text-left hidden sm:table-cell w-1/6">STATUS</th>
                                <th className="font-medium text-left w-1/6">#</th>
                            </tr>
                            <tr className="h-1"></tr>
                        </thead>

                        <tbody>
                            {employees.map((employee: EmployeeProps ) => (
                                <ListEmployee
                                    key={employee.id}
                                    employee={employee}
                                    token={storedToken}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        Not founded employees
                    </div>
                )}
            </main>
        </Container>
    );
};
