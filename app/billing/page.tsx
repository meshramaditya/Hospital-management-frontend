"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { mockBills } from "@/lib/mock-data"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { PageLayout } from "@/components/page-layout"

export default function BillingPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const columns = [
    { key: "id", label: "Bill ID" },
    { key: "patientName", label: "Patient" },
    { key: "date", label: "Date" },
    {
      key: "consultationFee",
      label: "Consultation",
      render: (bill: (typeof mockBills)[0]) => `$${bill.consultationFee}`,
    },
    {
      key: "total",
      label: "Total Amount",
      render: (bill: (typeof mockBills)[0]) => <span className="font-semibold text-foreground">${bill.total}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (bill: (typeof mockBills)[0]) => <StatusBadge status={bill.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <Button variant="outline" size="sm">
          View Invoice
        </Button>
      ),
    },
  ]

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground">Manage invoices and payments</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Generate Bill
          </Button>
        </div>

        <DataTable data={mockBills} columns={columns} searchKey="patientName" />
      </div>
    </PageLayout>
  )
}
