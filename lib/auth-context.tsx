"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock users for demo
    if (email === "admin@hospital.com" && password === "admin123") {
      setUser({
        id: "U001",
        name: "Admin User",
        email: "admin@hospital.com",
        role: "admin",
      })
      return true
    } else if (email === "doctor@hospital.com" && password === "doctor123") {
      setUser({
        id: "D001",
        name: "Dr. James Smith",
        email: "doctor@hospital.com",
        role: "doctor",
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
