"use client"

import { useAuth } from "@/app/context/AuthContext";
import ButtonAuth from "@/components/auth/button";
import FieldAuth from "@/components/auth/field";
import ImageAuth from "@/components/auth/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { z } from "zod"


const schema = z.object({
    email: z.string({required_error: "email is required"}).email({
        message: "invalid email address"
    }),
    password: z.string({
        required_error: "password is required"
    }).min(5, "must be 5 or more characters long")
})

type FormData = z.infer<typeof schema>

export default function Login() {
    const [errorApi, setErrorApi] = useState<string>('')
    const { login } = useAuth()

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const email = watch("email");
    const password = watch("password");

    useEffect(() => {
        setErrorApi('')
    }, [email, password]);

    async function handleLogin(formData: FormData) {
        try {
            const response = await login(formData.email, formData.password)

            if (!response.success) {
                setErrorApi(response.message)
            }
        } catch (err: any) {
            setErrorApi(err.message)
        }
    }

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]">
                <div className="md:flex w-full">

                    <ImageAuth />

                    <form className="w-full md:w-1/2 py-10 px-5 md:px-10" onSubmit={handleSubmit(handleLogin)}>

                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
                            <p>Welcome Back</p>

                        </div>

                        {errorApi != '' && <p className="text-xs text-red-500 mb-1">{errorApi}</p>}

                        <div>
                            <FieldAuth
                                label="Email"
                                mb="mb-5"
                                icon={<MdAlternateEmail size={20} color="#E5E7EB"/>}
                                type="text"
                                name="email"
                                placeholder="ethansmith"
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
                                text="SIGN IN"
                            />

                            <div className="mt-4 text-sm font-display font-semibold text-center">
                                Don't have an account? 
                                <Link href="/auth/register" className="cursor-pointer text-indigo-500 hover:text-indigo-700 duration-300 ml-1">
                                    Sign up
                                </Link>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
};
