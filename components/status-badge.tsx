import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "scheduled" | "completed" | "cancelled" | "pending" | "paid"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<typeof status, { label: string; className: string }> = {
    scheduled: { label: "Scheduled", className: "bg-primary/10 text-primary hover:bg-primary/20" },
    completed: { label: "Completed", className: "bg-success/10 text-success hover:bg-success/20" },
    cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
    pending: { label: "Pending", className: "bg-warning/10 text-warning-foreground hover:bg-warning/20" },
    paid: { label: "Paid", className: "bg-success/10 text-success hover:bg-success/20" },
  }

  const variant = variants[status]

  return (
    <Badge variant="secondary" className={cn(variant.className, className)}>
      {variant.label}
    </Badge>
  )
}
