"use client"

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useRouter } from "next/navigation";

const schema = z.object({
    duration: z.preprocess((val) => Number(val), z.number().min(1, "Duration is required")),
    start_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"),
    end_time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"),
    saturday_off: z.string(),
    closeDaysArray: z.array(z.number()).optional(),
    intervalsArray: z.array(
        z.object({
            start_time: z.union([z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"), z.literal("")]),
            end_time: z.union([z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"), z.literal("")]),
            id: z.union([z.number(), z.string(), z.literal("")]).optional(),
        })
    ).optional(),
});


type FormData = z.infer<typeof schema>

export function SettingsEmployee({ employeeId } : { employeeId: string}) {
    const { register, handleSubmit, setValue, watch,formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
// console.log(errors)
    const { authenticated } = useAuth()
    const [intervals, setIntervals] = useState([{ start: "", end: "", id: "" }]);
    const addInterval = () => {
        setIntervals([...intervals, { start: "", end: "", id: "" }]);
    };
    const removeInterval = (index: number) => {
        setIntervals(intervals.filter((_, i) => i !== index));
    };
    const formatTime = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1:$2')
            .slice(0, 5)
    }
    const selectedDays = watch("closeDaysArray") || [];
    const router = useRouter()

    useEffect(() => {
        async function getEmployeeSettings() {
            try {
                const response = await fetch(`/api/employee/settings/${employeeId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authenticated}`,
                    },
                })
                const data = await response.json()
  
                if (data.status == 'error') {
                    throw new Error(data.message)
                }

                const employeeSettings = data.employeeSettings

                if (employeeSettings) {
                    setValue('duration', employeeSettings.settings.duration);
                    setValue('start_time', employeeSettings.settings.start_time);
                    setValue('end_time', employeeSettings.settings.end_time);
                    setValue('saturday_off', employeeSettings.settings.saturday_off ? '1' : '0');

                    if (employeeSettings.settings.close_days != "") {
                        const closeDaysArray = employeeSettings.settings.close_days.split(",").map(Number);
                        setValue('closeDaysArray', closeDaysArray);
                    }

                    if (employeeSettings.intervals) {
                        const mappedIntervals = employeeSettings.intervals.map((interval : { start_time: string; end_time: string; id?: string }) => ({
                            start_time: interval.start_time,
                            end_time: interval.end_time,
                            id: interval.id || "",
                        }));
                        setValue('intervalsArray', mappedIntervals);
                        mappedIntervals.slice(1).forEach(() => addInterval());
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }

        getEmployeeSettings();
    }, [employeeId, authenticated]);

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
            
            if (response.ok) {
                router.replace("/dashboard")
            }

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
                    <Input
                        type="text"
                        name="start_time"
                        placeholder="HH:mm"
                        error={errors.start_time?.message}
                        register={register}
                        formatValue={formatTime}
                    />
                </div>
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">End service time<span className="text-red-500 ml-1">*</span></label>
                    <Input
                        type="text"
                        name="end_time"
                        placeholder="HH:mm"
                        error={errors.end_time?.message}
                        register={register}
                        rules={{
                            validate: (value) =>
                                value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)
                        }}
                        formatValue={formatTime}
                    />
                </div>
            </section>

            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Saturday off</label>
                    <select
                        className="w-full bottom-2 border rounded-md h-11 px-2 border-gray-200 outline-none
                        focus:border-indigo-500 focus:border-2 duration-200 text-gray-900"
                        {...register("saturday_off")}
                        value={watch("saturday_off")}
                    >
                        <option value="0">Not</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Intervals</label>
                    {intervals.map((interval, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    name={`intervalsArray.${index}.start_time`}
                                    placeholder="HH:mm"
                                    error={errors.intervalsArray?.[index]?.start_time?.message}
                                    register={register}
                                    rules={{
                                        validate: (value) =>
                                            value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value) || "Invalid time format (HH:MM)",
                                    }}
                                    formatValue={formatTime}
                                />
                                <span className="text-gray-300">às</span>
                                <Input
                                    type="text"
                                    name={`intervalsArray.${index}.end_time`}
                                    placeholder="HH:mm"
                                    error={errors.intervalsArray?.[index]?.end_time?.message}
                                    register={register}
                                    rules={{
                                        validate: (value) =>
                                            value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value) || "Invalid time format (HH:MM)",
                                    }}
                                    formatValue={formatTime}
                                />
                                <Input
                                    type="hidden"
                                    name={`intervalsArray.${index}.id`}
                                    placeholder=""
                                    register={register}
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-1 rounded"
                                        onClick={() => removeInterval(index)}
                                    >
                                        <IoIosRemove color="#FFF" size={16} />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-1 rounded"
                                    onClick={addInterval}
                                >
                                    <IoIosAdd color="#FFF" size={16} />
                                </button>
                            </div>
                            <div className="flex">
                                {errors.intervalsArray?.[index]?.start_time && (
                                    <span className="block text-red-500 mt-1">{errors.intervalsArray[index].start_time.message}</span>
                                )}
                                {errors.intervalsArray?.[index]?.end_time && (
                                    <span className="block text-red-500 mt-1">{errors.intervalsArray[index].end_time.message}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-gray-300">Close days without service</label>
                    <div className="flex gap-3 flex-wrap">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                        (day, index) => (
                        <label key={day} className="flex items-center p-1 gap-1 text-gray-300">
                            <input
                            type="checkbox"
                            value={index}
                            checked={selectedDays.includes(index)}
                            className="w-4 h-4 accent-blue-500"
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                const updatedDays = e.target.checked
                                ? [...selectedDays, value]
                                : selectedDays.filter((day) => day !== value);

                                setValue("closeDaysArray", updatedDays);
                            }}
                            />
                            {day}
                        </label>
                        )
                    )}
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