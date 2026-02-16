"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  CreditCard,
  FolderHeart,
  BarChart3,
  Activity,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const adminNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/records", label: "Medical Records", icon: FolderHeart },
  { href: "/reports", label: "Reports", icon: BarChart3 },
]

const doctorNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/appointments", label: "My Appointments", icon: Calendar },
  { href: "/prescriptions", label: "Prescriptions", icon: FileText },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/records", label: "Medical Records", icon: FolderHeart },
]

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = user?.role === "doctor" ? doctorNavItems : adminNavItems

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border p-6">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">MedCare</h1>
              <p className="text-xs text-sidebar-foreground/70">Hospital Management</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 md:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
                onClick={onClose}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
              {(user?.name ?? "?").charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name ?? "User"}</p>
              <p className="truncate text-xs capitalize text-sidebar-foreground/70">{user?.role ?? ""}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
