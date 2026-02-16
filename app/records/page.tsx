"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPatients, mockAppointments, mockPrescriptions } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { PageLayout } from "@/components/page-layout"

export default function RecordsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">View patient medical history</p>
        </div>

        <div>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or ID..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredPatients.map((patient) => {
            const patientAppointments = mockAppointments.filter((a) => a.patientId === patient.id)
            const patientPrescriptions = mockPrescriptions.filter((p) => p.patientId === patient.id)

            return (
              <Card key={patient.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-lg">{patient.name}</p>
                      <p className="text-sm font-normal text-muted-foreground">{patient.id}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Age</p>
                      <p className="font-medium text-foreground">{patient.age} years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Blood Type</p>
                      <p className="font-medium text-foreground">{patient.bloodType}</p>
                    </div>
                  </div>

                  {patient.medicalHistory && (
                    <div>
                      <p className="mb-1 text-sm text-muted-foreground">Medical History</p>
                      <p className="text-sm text-foreground">{patient.medicalHistory}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Visits</p>
                      <p className="text-lg font-semibold text-foreground">{patientAppointments.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Prescriptions</p>
                      <p className="text-lg font-semibold text-foreground">{patientPrescriptions.length}</p>
                    </div>
                  </div>

                  {patient.lastVisit && (
                    <div className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
