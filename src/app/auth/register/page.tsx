"use client"

import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import ImageAuth from "@/components/auth/image";
import FieldAuth from "@/components/auth/field";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ButtonAuth from "@/components/auth/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


const schema = z.object({
    username: z.string({
        required_error: "username is required"
    }).min(5, "must be 5 or more characters long"),
    email: z.string().email({
        message: "invalid email address"
    }),
    password: z.string({
        required_error: "password is required"
    }).min(5, "must be 5 or more characters long")
})

type FormData = z.infer<typeof schema>

export default function Register() {
    const router = useRouter()
    const [errorApi, setErrorApi] = useState<string>('')

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegister(formData: FormData) {
        try {
            const response = await fetch('/api/generator/register', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            })
    
            const data = await response.json();

            if (data.success && data.message === 'User Created.') {
                router.push('/auth/login')
                return
            }

            setErrorApi(data.message)
        } catch(err: any) {
          setErrorApi(err)
        }
    }

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]">
                <div className="md:flex w-full">

                    <ImageAuth />

                    <form className="w-full md:w-1/2 py-10 px-5 md:px-10" onSubmit={handleSubmit(handleRegister)}>

                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                            <p>Enter your information to register</p>
                        </div>

                        {errorApi != '' && <p className="text-xs text-red-500 mb-1">{errorApi}</p>}

                        <div>
                            <FieldAuth
                                label="username"
                                mb="mb-5"
                                icon={<MdOutlineEmail size={20} color="#E5E7EB"/>}
                                name="username"
                                type="text"
                                placeholder="your username"
                                error={errors.username?.message}
                                register={register}
                            />

                            <FieldAuth
                                label="Email"
                                mb="mb-5"
                                icon={<FaRegUser size={20} color="#E5E7EB"/>}
                                type="email"
                                name="email"
                                placeholder="ethan@email.com"
                                error={errors.email?.message}
                                register={register}
                            />

                            <FieldAuth
                                label="Password"
                                mb="mb-12"
                                icon={<TbLockPassword size={20} color="#E5E7EB"/>}
                                type="password"
                                name="password"
                                placeholder="************"
                                error={errors.password?.message}
                                register={register}
                            />

                            <ButtonAuth
                                text="CREATE ACCOUNT"
                            />

                            <div className="mt-4 text-sm font-display font-semibold text-center">
                                Have an account yet? 
                                <Link href="/auth/login" className="cursor-pointer text-indigo-500 hover:text-indigo-700 duration-300 ml-1">
                                    Sign in
                                </Link>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
};
