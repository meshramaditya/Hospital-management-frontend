"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Plus, CalendarIcon } from "lucide-react"
import { mockAppointments } from "@/lib/mock-data"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLayout } from "@/components/page-layout"

export default function AppointmentsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [view, setView] = useState<"table" | "calendar">("table")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const columns = [
    { key: "id", label: "Appointment ID" },
    { key: "patientName", label: "Patient" },
    { key: "doctorName", label: "Doctor" },
    { key: "type", label: "Type" },
    {
      key: "datetime",
      label: "Date & Time",
      render: (apt: (typeof mockAppointments)[0]) => `${apt.date} at ${apt.time}`,
    },
    {
      key: "status",
      label: "Status",
      render: (apt: (typeof mockAppointments)[0]) => <StatusBadge status={apt.status} />,
    },
  ]

  // Group appointments by date for calendar view
  const appointmentsByDate = mockAppointments.reduce(
    (acc, apt) => {
      if (!acc[apt.date]) {
        acc[apt.date] = []
      }
      acc[apt.date].push(apt)
      return acc
    },
    {} as Record<string, typeof mockAppointments>,
  )

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Manage patient appointments</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as "table" | "calendar")} className="space-y-6">
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <DataTable data={mockAppointments} columns={columns} searchKey="patientName" />
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(appointmentsByDate).map(([date, appointments]) => (
                <Card key={date}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CalendarIcon className="h-5 w-5" />
                      {date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <p className="text-sm font-medium text-foreground">{apt.time}</p>
                            <StatusBadge status={apt.status} />
                          </div>
                          <p className="text-sm text-foreground">{apt.patientName}</p>
                          <p className="text-xs text-muted-foreground">{apt.type}</p>
                          <p className="text-xs text-muted-foreground">{apt.doctorName}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
