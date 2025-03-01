'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { DashboardHeader } from "./components/header";
import { Header } from "@/components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
    const { authenticated, loading } = useAuth()
    const router = useRouter()

    useEffect( () => {
        if (!loading && !authenticated) {
            router.push('auth/login')
        }
    }, [ authenticated, loading, router])

    if (loading) return <p>Carregando...</p>;

    if (!authenticated) return null;

    return (
        <>
            <Header />
            <DashboardHeader />
            {children}
        </>
    )
};
