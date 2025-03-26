'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
    const { authenticated } = useAuth()
    const router = useRouter()

    useEffect( () => {
        if (!authenticated) {
            router.push('auth/login')
        }
    }, [ authenticated, router])

    if (!authenticated) return null;

    return <>{children}</>
};
