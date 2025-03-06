"use client"

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    authenticated: string|null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [authenticated, setAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('/api/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await response.json()
    
                setAuthenticated(data.authenticated)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            })
    
            const data = await response.json();
            
            if (data.status == 'error') {
                throw new Error(data.message)
            }

            if (response.ok) {
                setAuthenticated(data.token)
                router.push('/')

                return {
                    'success': true,
                    'message': data.message 
                }
            }

            return { success: false, message: data.message || "Invalid Credentials" };
        } catch(err: any) {
            console.log(err)

            return {
                'success': false,
                'message': err.message 
            }
        }
    }

    const logout = () => {
        fetch('/api/auth/logout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })

        setAuthenticated(null)
        router.push('/auth/login')
    }

    return (
        <AuthContext.Provider value={{ authenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Erro to use AuthProvider");
    }

    return context;
}