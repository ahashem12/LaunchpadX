// import { IconType } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Globe } from "lucide-react"

interface FundraisingCardProps {
  title: string
  description: string
  icon: "dollar-sign" | "users" | "globe"
  children: React.ReactNode
}

const iconMap = {
  "dollar-sign": DollarSign,
  "users": Users,
  "globe": Globe
}

export function FundraisingCard({ title, description, icon, children }: FundraisingCardProps) {
  const Icon = iconMap[icon]
  
  return (
    <Card className="border-gray-700 bg-gray-900">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-500/20">
            <Icon className="h-5 w-5 text-green-500" />
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm">{description}</p>
        {children}
      </CardContent>
    </Card>
  )
}