"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
    formatValue?: (value: string) => string;
}

export function Input({ name, placeholder, type, register, rules, error, formatValue }: InputProps) {
    return (
        <>
            <input
                className="w-full bottom-2 border rounded-md h-11 px-2 
                border-gray-200 outline-none focus:border-indigo-500 focus:border-2 duration-200"
                type={type} 
                placeholder={placeholder}
                id={name}
                {...register(name, {
                    ...rules,
                    onChange: (e) => {
                        if (formatValue) {
                            e.target.value = formatValue(e.target.value);
                        }
                    }
                })}
            />
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
        
    )
}