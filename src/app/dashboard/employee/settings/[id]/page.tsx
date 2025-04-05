import { Container } from "@/components/container";
import { cookies } from 'next/headers'
import { SettingsEmployee } from "../../components/settingsForm";

export default async function EmployeeSettings( { params }: { params: { id: string }} ) {
    const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string
    const cookieStore = cookies()
    const storedToken = cookieStore.get(TOKEN_KEY)?.value

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee/${params.id}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Accept": "application/json",
        }
    })

    const data = await response.json()
console.log(data)
    return (
        <Container>
            {data.employee ? (
                <main className="text-slate-200">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold">{data.employee.full_name} Settings</h1>
                    </div>
                </main>
            ) : (
                <main className="text-slate-200">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold">Employee not found</h1>
                    </div>
                </main>
            )}

            {data.employee && (
                <SettingsEmployee
                    employeeId={data.employee.id}
                />
            )}

        </Container>
    )
};
