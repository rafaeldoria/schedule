"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ name, placeholder, type, register, rules, error }: InputProps) {
    return (
        <>
            <input
                className="w-full bottom-2 border rounded-md h-11 px-2 
                border-gray-200 outline-none focus:border-rose-500 focus:border-2 duration-200"
                type={type} 
                placeholder={placeholder}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
        
    )
}