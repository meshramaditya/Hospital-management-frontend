"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      <main className={cn("mt-16 pt-6 sm:pt-8 md:pt-10 p-4 sm:p-6 md:ml-64", className)}>
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
