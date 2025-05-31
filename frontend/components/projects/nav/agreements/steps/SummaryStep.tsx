"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { AgreementData } from "@/types/agreements"

interface SummaryStepProps {
  data: AgreementData
}

export function SummaryStep({ data }: SummaryStepProps) {
  const COLORS = ["#10B981", "#059669", "#047857", "#065F46"]

  const chartData = data.equity.allocations.map((allocation) => {
    const founder = data.organization.coFounders.find((f) => f.id === allocation.userId)
    return {
      name: founder?.name || "Unknown",
      value: allocation.percentage,
    }
  })

  const getGovernanceModelName = () => {
    switch (data.governance.model) {
      case "proportional":
        return "Proportional"
      case "quadratic":
        return "Quadratic"
      case "cooperative":
        return "Cooperative"
      default:
        return "Unknown"
    }
  }

  return (
    <div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <p className="text-amber-800 text-sm">
          Please check all sections. If you need to change something, use the Edit button.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Organization Setup</h3>
            <Button variant="outline" size="sm" className="h-8">
              <Edit2 className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Organization Name</p>
              <p className="font-medium">{data.organization.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Name</p>
              <p className="font-medium">{data.organization.tokenName || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Symbol</p>
              <p className="font-medium">{data.organization.tokenSymbol || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Decimals</p>
              <p className="font-medium">{data.organization.tokenDecimals}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Co-Founders</p>
            <div className="space-y-3">
              {data.organization.coFounders.map((founder) => (
                <div key={founder.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={founder.avatar || "/placeholder.svg"} alt={founder.name} />
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {founder.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{founder.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500">{founder.role}</span>
                    {founder.tag && (
                      <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-none">{founder.tag}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Equity Allocation</h3>
            <Button variant="outline" size="sm" className="h-8">
              <Edit2 className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Limit token amount</p>
            <p className="font-medium">{data.equity.limitTokenAmount ? "Yes" : "No"}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Vesting</p>
            <p className="font-medium">{data.equity.enableVesting ? "Enabled" : "Disabled"}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-2">Allocations</p>
              <div className="space-y-2">
                {data.equity.allocations.map((allocation) => {
                  const founder = data.organization.coFounders.find((f) => f.id === allocation.userId)
                  return (
                    <div key={allocation.userId} className="flex items-center justify-between">
                      <span>{founder?.name}</span>
                      <div className="flex items-center space-x-2">
                        <span>{allocation.percentage}%</span>
                        <span className="text-gray-500">({allocation.tokenAmount} tokens)</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Governance</h3>
            <Button variant="outline" size="sm" className="h-8">
              <Edit2 className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Selected Model</p>
            <p className="font-medium">{getGovernanceModelName()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
