import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import authImg from "@/assets/auth/auth.png"
import Image from "next/image";

export default function Register() {
    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]">
                <div className="md:flex w-full">

                    <div className="hidden md:block w-1/2 bg-indigo-400 py-10 px-10 text-white">
                    <Image
                        src={authImg}
                        alt="Image auth schedule"
                    />
                    </div>

                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">

                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                            <p>Enter your information to register</p>
                        </div>

                        <div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Username
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <MdOutlineEmail size={20} color="#E5E7EB"/>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 duration-300"
                                            placeholder="ethansmith"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Email
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <FaRegUser size={20} color="#E5E7EB"/>
                                        </div>
                                        <input
                                            type="email"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 duration-300"
                                            placeholder="ethan@email.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Password
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <TbLockPassword size={20} color="#E5E7EB"/>
                                        </div>
                                        <input
                                            type="password"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 duration-300"
                                            placeholder="************"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 duration-300 text-white rounded-lg px-3 py-3 font-semibold">
                                        CREATE ACCOUNT
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 text-sm font-display font-semibold text-center">
                                Have an account yet? <a className="cursor-pointer text-indigo-500 hover:text-indigo-700 duration-300">Sign in</a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};
