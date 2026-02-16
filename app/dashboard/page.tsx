"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { KpiCard } from "@/components/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, UserCheck, Activity } from "lucide-react"
import { mockPatients, mockAppointments } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { PageLayout } from "@/components/page-layout"

const appointmentData = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 19 },
  { day: "Wed", appointments: 15 },
  { day: "Thu", appointments: 22 },
  { day: "Fri", appointments: 18 },
  { day: "Sat", appointments: 8 },
  { day: "Sun", appointments: 5 },
]

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const todayAppointments = mockAppointments.filter((a) => a.date === "2024-12-30")
  const recentAppointments = mockAppointments.slice(0, 5)

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            {user.role === "admin" ? "Admin Dashboard" : "Doctor Dashboard"}
          </h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>

        {user.role === "admin" ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                title="Total Patients"
                value={mockPatients.length}
                icon={Users}
                trend={{ value: "12% from last month", positive: true }}
              />
              <KpiCard
                title="Today's Appointments"
                value={todayAppointments.length}
                icon={Calendar}
                description="3 scheduled"
              />
              <KpiCard
                title="Monthly Revenue"
                value="$67,000"
                icon={DollarSign}
                trend={{ value: "8% from last month", positive: true }}
              />
              <KpiCard title="Active Doctors" value="4" icon={UserCheck} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={appointmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="appointments" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            <KpiCard title="Today's Appointments" value={todayAppointments.length} icon={Calendar} />
            <KpiCard title="Patients Treated Today" value="8" icon={Users} />
            <KpiCard title="Prescriptions Written" value="12" icon={Activity} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right">
                    <p className="font-medium text-foreground">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p>{appointment.doctorName}</p>
                  </div>
                  <div className="sm:ml-4">
                    <StatusBadge status={appointment.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
