import { UseFormRegister } from "react-hook-form";

interface FieldProps {
    label: string;
    mb: string;
    icon: React.ReactNode;
    name: string;
    type: string;
    placeholder: string;
    error?: string;
    register: UseFormRegister<any>;
}

export default function FieldAuth({ label, mb, icon, name, type, placeholder, error, register }: FieldProps) {
    return (
            <div className="flex -mx-3">
                <div className={`w-full px-3 ${mb}`}>
                    <label htmlFor="" className="text-xs font-semibold px-1">
                        {label}
                    </label>
                    <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            {icon}
                        </div>
                        <input
                            type={type}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 duration-300"
                            placeholder={placeholder}
                            {...register(name)}
                        />
                    </div>

                    {error && <p className="text-xs text-red-500 my-1">{error}</p>}
                </div>
            </div>
    )
};
