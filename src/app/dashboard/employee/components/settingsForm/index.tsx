"use client"

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputMask from "react-input-mask"
import { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const schema = z.object({
    duration: z.preprocess((val) => Number(val), z.number().min(1, "Duration is required")),
    start_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"),
    end_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"),
    saturday_off: z.string(),
    closeDaysArray: z.array(z.string()).optional(),
    intervalsArray: z.array(
        z.object({
            start: z.union([z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"), z.literal("")]),
            end: z.union([z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"), z.literal("")]),
        })
    ).optional(),
});


type FormData = z.infer<typeof schema>

export function SettingsEmployee({ employeeId } : { employeeId: string}) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    console.log(errors);
    const { authenticated, loading } = useAuth()
    const router = useRouter()

    const [intervals, setIntervals] = useState([{ start: "", end: "" }]);
    const addInterval = () => {
        setIntervals([...intervals, { start: "", end: "" }]);
    };
    const removeInterval = (index: number) => {
        setIntervals(intervals.filter((_, i) => i !== index));
    };

    async function handleSaveSettings(formData: FormData) {
        try {
            const updatedFormData = { ...formData, employeeId };
            const response = await fetch('/api/employee/settings', {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authenticated}`,
                },
                body: JSON.stringify(updatedFormData),
            })
    
            const data = await response.json();

            if (data.status == 'error') {
                throw new Error(data.message)
            }

            console.log(data)
            // if (response.ok) {
            //     router.refresh()
            //     // router.replace("/dashboard")
            // }

        } catch(err: any) {
            console.log(err)
        }
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleSaveSettings)}>
            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Duration (in minutes)<span className="text-red-500 ml-1">*</span></label>
                    <Input
                        type="number"
                        name="duration"
                        placeholder="Type duration for a service."
                        error={errors.duration?.message}
                        register={register}
                    />
                </div>
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Start service time<span className="text-red-500 ml-1">*</span></label>
                    <InputMask
                         mask="99:99"
                         maskChar={null}
                         placeholder="HH:mm"
                         className="w-full bottom-2 border rounded-md h-11 px-2 border-gray-200 outline-none
                        focus:border-indigo-500 focus:border-2 duration-200 text-gray-900"
                         {...register("start_time", {
                            pattern: {
                                value: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
                                message: "Invalid time format (HH:MM)",
                            },
                        })}
                    />
                    {errors.start_time && <span className="text-red-500">{errors.start_time.message}</span>}
                </div>
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">End service time<span className="text-red-500 ml-1">*</span></label>
                    <InputMask
                        mask="99:99"
                        maskChar={null}
                        placeholder="HH:mm"
                        className="w-full bottom-2 border rounded-md h-11 px-2 border-gray-200 outline-none
                        focus:border-indigo-500 focus:border-2 duration-200 text-gray-900"
                         {...register("end_time", {
                             pattern: {
                                 value: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
                                 message: "Invalid time format (HH:MM)",
                             },
                         })}
                    />
                    {errors.end_time && <span className="text-red-500">{errors.end_time.message}</span>}
                </div>
            </section>

            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Saturday off</label>
                    <select
                        className="w-full bottom-2 border rounded-md h-11 px-2 border-gray-200 outline-none
                        focus:border-indigo-500 focus:border-2 duration-200 text-gray-900"
                        {...register("saturday_off")}
                    >
                        <option value="0">Not</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Intervals</label>
                    {intervals.map((interval, index) => (
                        <div key={index} className="mb-2">
                            <div key={index} className="flex items-center gap-2">
                                <InputMask
                                    mask="99:99"
                                    maskChar={null}
                                    placeholder="HH:mm"
                                    className="w-full bottom-2 border rounded-md h-11 px-2 border-gray-200 outline-none
                                    focus:border-indigo-500 focus:border-2 duration-200 text-gray-900"
                                    {...register(`intervalsArray.${index}.start`, {
                                        validate: (value) =>
                                            value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value) || "Invalid time format (HH:MM)",
                                    })}
                                />
                                <span className="text-gray-300">às</span>
                                <InputMask
                                    mask="99:99"
                                    maskChar={null}
                                    placeholder="HH:mm"
                                    className="w-full bottom-2 border rounded-md h-11 px-2 border-gray-200 outline-none
                                    focus:border-indigo-500 focus:border-2 duration-200 text-gray-900"
                                    {...register(`intervalsArray.${index}.end`, {
                                        validate: (value) =>
                                            value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value) || "Invalid time format (HH:MM)",
                                    })}
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-1 rounded"
                                        onClick={() => removeInterval(index)}
                                    >
                                        <IoIosRemove color="#FFF" size={16}/>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-1 rounded"
                                    onClick={addInterval}
                                >
                                    <IoIosAdd color="#FFF" size={16}/>
                                </button>
                            </div>
                            <div className="flex">
                                {errors.intervalsArray?.[index]?.start && (
                                    <span className="block text-red-500 mt-1">{errors.intervalsArray[index].start.message}</span>
                                )}
                                {errors.intervalsArray?.[index]?.end && (
                                    <span className="block text-red-500 mt-1">{errors.intervalsArray[index].end.message}</span>
                                )}
                            </div>
                            
                        </div>
                    ))}
                    
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Close days without service</label>
                    <div className="flex gap-3 flex-wrap">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",].map((day, index) => (
                            <label key={day} className="flex items-center p-1 gap-1 text-gray-300">
                                <input
                                    type="checkbox"
                                    value={index}
                                    {...register("closeDaysArray")}
                                    className="w-4 h-4 accent-blue-500"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            <button
                type="submit"
                className="bg-blue-500 text-white px-2 h-11 my-4 rounded font-bold hover:bg-blue-700 hover:text-lg duration-300"
            >
                Save
            </button>

            <section>
                <div className="flex justify-end flex-1">
                    <p className="text-red-200 text-sm"><span className="text-red-500 mr-1">*</span>Required</p>
                </div>
            </section>

        </form>
    )
}