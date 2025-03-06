import { Container } from "@/components/container";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { EmployeeProps } from "@/utils/employee.type";
import { cookies } from 'next/headers'

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
    const employees = await response.json()

    return (
        <Container>
            <main className="text-slate-200">

                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold">Employees</h1>
                    <div className="flex items-center gap-3">
                        <Link href='/dashboard/employee/new' className="flex bg-blue-500 px-4 py-1 rounded text-white gap-2">
                            <IoIosAddCircle size={20} color="#E5E7EB"/>
                            New employee
                        </Link>
                    </div>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left pl-1">EMPLOYEE</th>
                            <th className="font-medium text-left hidden sm:block">FUNCTION</th>
                            <th className="font-medium text-left">EMAIL</th>
                            <th className="font-medium text-left">STATUS</th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.data.map((employee: EmployeeProps ) => (
                            <tr key={employee.id} 
                                className="text-slate-800 font-medium border-b-2 border-b-slate-300 h-16 
                                    last:border-b-0 bg-slate-200 hover:bg-gray-300 duration-300">
                                <td className="text-left pl-1 ml-2">
                                    {employee.full_name}
                                </td>
                                <td className="text-left hidden sm:table-cell">
                                    {employee.function}
                                </td>
                                <td className="text-left hidden sm:table-cell">
                                    {employee.email}
                                </td>
                                <td className="text-left hidden sm:table-cell">
                                    {employee.available == 0 ? 'Not Available' : 'Avaiable'}
                                </td>
                                <td className="text-left">
                                    {/* edit profile and setting*/}
                                    <button className="mr-3">
                                        <FaEdit size={20} color="#007e1f"/>
                                    </button>
                                    {/* view profile and setting*/}
                                    <button className="mr-3">
                                        <IoSettingsSharp size={20} color="#5e5d5d"/>
                                    </button>
                                    {/** go to schedule */}
                                    <button>
                                        <RiCalendarScheduleLine size={20} color="#742100"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </Container>
    );
};
