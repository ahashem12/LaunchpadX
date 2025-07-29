"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

interface CoFounder {
  id: string
  name: string
  role: string
  tag?: string
  avatar?: string
}

interface EquityData {
  limitTokenAmount: boolean
  totalTokens: number
  enableVesting: boolean
  allocations: Array<{
    userId: string
    percentage: number
    tokenAmount: number
  }>
}

interface EquityStepProps {
  data: EquityData
  coFounders: CoFounder[]
  updateData: (data: Partial<EquityData>) => void
}

export function EquityStep({ data, coFounders, updateData }: EquityStepProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const COLORS = ["#10B981", "#059669", "#047857", "#065F46"]

  useEffect(() => {
    const newChartData = data.allocations.map((allocation, index) => {
      const founder = coFounders.find((f) => f.id === allocation.userId)
      return {
        name: founder?.name || `User ${index + 1}`,
        value: allocation.percentage,
        userId: allocation.userId,
      }
    })
    setChartData(newChartData)
  }, [data.allocations, coFounders])

  const updateAllocation = (userId: string, field: "percentage" | "tokenAmount", value: number) => {
    const newAllocations = data.allocations.map((allocation) => {
      if (allocation.userId === userId) {
        if (field === "percentage") {
          return {
            ...allocation,
            percentage: value,
            tokenAmount: data.totalTokens * (value / 100),
          }
        } else {
          return {
            ...allocation,
            tokenAmount: value,
            percentage: (value / data.totalTokens) * 100,
          }
        }
      }
      return allocation
    })

    updateData({ allocations: newAllocations })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Equity Allocation</h2>
      <p className="text-gray-500 mb-8">
        Set up the token allocation for your co-founders. The allocation can always be changed by updating the contract.
      </p>

      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-gray-500">{data.totalTokens.toLocaleString()}</div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="limit-token" className="cursor-pointer">
            Limit token amount
          </Label>
          <Switch
            id="limit-token"
            checked={data.limitTokenAmount}
            onCheckedChange={(checked) => updateData({ limitTokenAmount: checked })}
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">Vesting (optional)</h3>
          </div>
          <Switch
            id="enable-vesting"
            checked={data.enableVesting}
            onCheckedChange={(checked) => updateData({ enableVesting: checked })}
          />
        </div>
        <p className="text-sm text-gray-500">
          Activate vesting to schedule when each co-founder receives their equity.
        </p>
      </div>

      <div className="mb-8">
        <Button variant="outline" className="w-full py-6">
          <Plus className="mr-2 h-4 w-4" />
          New Pool
        </Button>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-medium text-gray-500">
          <div>NAME</div>
          <div>%</div>
          <div>TOKEN AMOUNT</div>
        </div>

        {data.allocations.map((allocation) => {
          const founder = coFounders.find((f) => f.id === allocation.userId)
          return (
            <div key={allocation.userId} className="grid grid-cols-3 gap-4 py-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={founder?.avatar || "/placeholder.svg"} alt={founder?.name} />
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    {founder?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{founder?.name}</span>
              </div>
              <div>
                <Input
                  type="number"
                  value={allocation.percentage}
                  onChange={(e) => updateAllocation(allocation.userId, "percentage", Number(e.target.value))}
                  className="w-20"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={allocation.tokenAmount}
                  onChange={(e) => updateAllocation(allocation.userId, "tokenAmount", Number(e.target.value))}
                />
                <span className="text-sm text-gray-500">ConTKN</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
