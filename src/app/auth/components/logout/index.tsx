"use client"

import { useAuth } from "@/app/context/AuthContext"
import { useEffect } from "react";

export function AuthLogout() {
    const { logout } = useAuth()
    
    useEffect(() => {
        logout();
    }, []);

    return (
        <>Unauthorized</>
    )
}