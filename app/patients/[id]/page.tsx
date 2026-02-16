"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockPatients, mockAppointments, mockPrescriptions } from "@/lib/mock-data"
import { ArrowLeft, User, Phone, Mail, MapPin, Droplet, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import { PageLayout } from "@/components/page-layout"

export default function PatientProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const patient = mockPatients.find((p) => p.id === patientId)

  if (!patient) {
    return (
      <PageLayout>
        <p>Patient not found</p>
      </PageLayout>
    )
  }

  const patientAppointments = mockAppointments.filter((a) => a.patientId === patientId)
  const patientPrescriptions = mockPrescriptions.filter((p) => p.patientId === patientId)

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="space-y-4">
          <Link href="/patients">
            <Button variant="ghost" className="w-full justify-start sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Patient Profile</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.id}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium text-foreground">
                    {patient.age} years, {patient.gender}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium text-foreground">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-foreground">{patient.email}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Address:</span>
                  <span className="flex-1 font-medium text-foreground">{patient.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Droplet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Blood Type:</span>
                  <span className="font-medium text-foreground">{patient.bloodType}</span>
                </div>
              </div>

              {patient.medicalHistory && (
                <div className="border-t border-border pt-4">
                  <p className="mb-2 text-sm font-medium text-foreground">Medical History</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{patient.medicalHistory}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Appointment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patientAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {patientAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-medium text-foreground">{appointment.type}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{appointment.doctorName}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.date} at {appointment.time}
                            </p>
                          </div>
                          <StatusBadge status={appointment.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">No appointments found</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patientPrescriptions.length > 0 ? (
                  <div className="space-y-4">
                    {patientPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="rounded-lg border border-border p-4">
                        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-medium text-foreground">{prescription.diagnosis}</p>
                            <p className="text-sm text-muted-foreground">{prescription.doctorName}</p>
                            <p className="text-sm text-muted-foreground">{prescription.date}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">Medicines:</p>
                          {prescription.medicines.map((medicine, index) => (
                            <div key={index} className="ml-4 text-sm text-muted-foreground">
                              • {medicine.name} - {medicine.dosage} for {medicine.duration}
                            </div>
                          ))}
                        </div>
                        {prescription.notes && (
                          <div className="mt-3 border-t border-border pt-3">
                            <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">No prescriptions found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
