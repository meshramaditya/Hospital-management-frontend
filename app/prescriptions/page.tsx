"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { mockPrescriptions } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageLayout } from "@/components/page-layout"

export default function PrescriptionsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Prescriptions</h1>
            <p className="text-muted-foreground">Create and manage prescriptions</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Prescription
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {mockPrescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{prescription.id}</span>
                  <span className="text-sm font-normal text-muted-foreground">{prescription.date}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium text-foreground">{prescription.patientName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Diagnosis</p>
                  <p className="font-medium text-foreground">{prescription.diagnosis}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Medicines</p>
                  <div className="space-y-2">
                    {prescription.medicines.map((medicine, index) => (
                      <div key={index} className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm font-medium text-foreground">{medicine.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {medicine.dosage} • {medicine.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm leading-relaxed text-foreground">{prescription.notes}</p>
                  </div>
                )}

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">Prescribed by {prescription.doctorName}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
