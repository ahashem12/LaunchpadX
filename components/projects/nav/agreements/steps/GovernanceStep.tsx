"use client"

import { Card, CardContent } from "@/components/ui/card"
import { InfoIcon as InfoCircle } from "lucide-react"

interface GovernanceData {
  model: "proportional" | "quadratic" | "cooperative"
}

interface GovernanceStepProps {
  data: GovernanceData
  updateData: (data: Partial<GovernanceData>) => void
}

export function GovernanceStep({ data, updateData }: GovernanceStepProps) {
  const governanceModels = [
    {
      id: "proportional",
      title: "Proportional",
      description: "The voting power is proportional to your token holdings.",
      formula: "1 token : 1 vote",
      recommended: true,
    },
    {
      id: "quadratic",
      title: "Quadratic",
      description: "The voting power is proportional to the square root of your token holdings.",
      formula: "sqrt : 1 vote",
      recommended: false,
    },
    {
      id: "cooperative",
      title: "Cooperative",
      description: "One voting power is allocated to each member regardless of token holdings.",
      formula: "1 member : 1 vote",
      recommended: false,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Governance</h2>
      <p className="text-gray-500 mb-8">
        Select your preferred model for distributing voting power. While most companies use the proportional governance
        model, we offer several alternative options that may also suit your needs.
      </p>

      <div className="grid grid-cols-3 gap-6">
        {governanceModels.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer transition-all ${
              data.model === model.id ? "border-orange-500 ring-1 ring-orange-500" : "hover:border-gray-300"
            }`}
            onClick={() => updateData({ model: model.id as GovernanceData["model"] })}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                {model.recommended && <span className="text-amber-500 text-xs flex items-center">⭐ Recommended</span>}
                <div className="ml-auto">
                  <InfoCircle className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">{model.title}</h3>

              <p className="text-sm text-gray-500 mb-6">{model.description}</p>

              <div className="text-center text-sm text-gray-600 border-t pt-4">{model.formula}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
