import { Badge } from "@/components/ui/badge"

type Priority = "high" | "medium" | "low"

const priorityColors: Record<Priority, string> = {
    high: "bg-orange-500 hover:bg-orange-600",
    medium: "bg-blue-500 hover:bg-blue-600",
    low: "bg-gray-500 hover:bg-gray-600"
}

interface PriorityBadgeProps {
    priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
    return (
        <Badge className={`${priorityColors[priority]} text-white`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
    )
}

