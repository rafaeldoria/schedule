"use client"

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuth } from "@/app/context/AuthContext";

const schema = z.object({
    fullName: z.string({
        required_error: "Name is required"
    }).min(5, "must be 5 or more characters long"),
    email: z.string().email({
        message: "Invalid email address"
    }),
    _function: z.string({
        required_error: "Function is required"
    }).min(5, "must be 5 or more characters long"),
})

type FormData = z.infer<typeof schema>

export function NewEmployeeForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { authenticated, loading } = useAuth()
    const router = useRouter()

    async function handleSave(formData: FormData) {
        try {
            const response = await fetch('/api/employee', {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authenticated}`,
                },
                body: JSON.stringify(formData),
            })
    
            const data = await response.json();

            if (data.status == 'error') {
                throw new Error(data.message)
            }

            if (response.ok) {
                router.refresh()
                router.replace("/dashboard")
            }

        } catch(err: any) {
            console.log(err)
        }
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleSave)}>
            <label className="mb-1 text-lg font-medium text-gray-300">Full Name</label>
            <Input
                type="text"
                name="fullName"
                placeholder="Type your full name."
                error={errors.fullName?.message}
                register={register}
            />

            <section className="flex gap-2 my-2 flex-col sm:flex-row">

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Function</label>
                    <Input
                        type="text"
                        name="_function"
                        placeholder="Type your full name."
                        error={errors._function?.message}
                        register={register}
                    />
                </div>

                <div className="flex-1">
                <label className="mb-1 text-lg font-medium text-gray-300">Email</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Type your email."
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
            </section>

            <button
                type="submit"
                className="bg-blue-500 text-white px-2 h-11 my-4 rounded font-bold hover:bg-blue-700 hover:text-lg duration-300"
            >
                Save
            </button>

        </form>
    )
}