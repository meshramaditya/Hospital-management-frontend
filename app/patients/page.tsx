"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Edit } from "lucide-react"
import { mockPatients } from "@/lib/mock-data"
import { DataTable } from "@/components/data-table"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"

export default function PatientsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const columns = [
    { key: "id", label: "Patient ID" },
    { key: "name", label: "Name" },
    {
      key: "age",
      label: "Age/Gender",
      render: (patient: (typeof mockPatients)[0]) => `${patient.age} / ${patient.gender}`,
    },
    { key: "phone", label: "Phone" },
    { key: "lastVisit", label: "Last Visit" },
    {
      key: "actions",
      label: "Actions",
      render: (patient: (typeof mockPatients)[0]) => (
        <div className="flex gap-2">
          <Link href={`/patients/${patient.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground">Manage patient records</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <DataTable data={mockPatients} columns={columns} searchKey="name" />
      </div>
    </PageLayout>
  )
}
