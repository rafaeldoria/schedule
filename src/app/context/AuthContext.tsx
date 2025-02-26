"use client"

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const TOKEN_KEY = 'auth_token'

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY)

        if (storedToken) {
            setToken(storedToken)
        }
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

            if (response.ok && data.token) {
                localStorage.setItem(TOKEN_KEY, data.token)
                setToken(data.token)
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

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(token),
        })

        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        router.push('/auth/login')
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
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