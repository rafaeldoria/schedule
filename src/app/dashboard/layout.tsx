'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
    const { token } = useAuth()
    const router = useRouter()

    useEffect( () => {
        if (!token) {
            router.push('auth/login')
        }
    }, [ token, router])

    if (!token) return null;

    return <>{children}</>
};
