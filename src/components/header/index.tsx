import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
    const { logout } = useAuth()

    async function handleLogout() {
        logout()
    }
    return (
        <header className="w-full flex items-center px-2 py-4 bg-slate-800 h-20 shadow-sm">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link href='/'>
                    <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300 text-gray-300">
                        <span className="text-rose-800">VET</span> Schedule
                    </h1>
                </Link>

                <div className="flex items-baseline gap-4">
                    <Link href="/dashboard">
                        <FiUser size={26} color="#4b5563" />
                    </Link>

                    <button onClick={handleLogout} >
                        <FiLogOut size={26} color="#e61212" className="hover:size-7 duration-300"/>
                    </button>
                </div>
            </div>
        </header>
    )
};
