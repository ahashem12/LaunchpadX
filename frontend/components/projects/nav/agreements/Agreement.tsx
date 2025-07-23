"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertCircle, FileText } from "lucide-react"
import { AgreementWizardModal } from "./AgreementWizardModal"
import type { AgreementData } from "@/types/agreements"

export function Agreement() {
  const [selectedAgreement, setSelectedAgreement] = useState<AgreementOption | null>(null)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [agreementData, setAgreementData] = useState<AgreementData | null>(null)

  const agreementOptions: AgreementOption[] = [
    {
      id: "basic",
      title: "Basic Agreement",
      description: "Recommended if you are first time founders or new to web3.",
      features: ["fixed equity distribution"],
      color: "green-500",
      recommended: false,
    },
    {
      id: "intermediate",
      title: "Intermediate Agreement",
      description:
        "Recommended if you are a little bit more versed with equity allocation models, but still want to keep it simple.",
      features: ["fixed equity distribution", "pools", "vesting", "governance"],
      color: "red-500",
      recommended: true,
    },
    {
      id: "advanced",
      title: "Advanced Agreement",
      description: "Recommended for seasoned founders, who want to take into account each members contribution.",
      features: ["fixed equity distribution", "dynamic equity distribution", "pools", "vesting", "governance"],
      color: "white",
      recommended: false,
    },
  ]

  const handleSelectAgreement = (agreement: AgreementOption) => {
    setSelectedAgreement(agreement)
    setIsWizardOpen(true)
  }

  const handleSubmitAgreement = (data: AgreementData) => {
    // Store the agreement data in state
    setAgreementData(data)

    // Log the data to console for demonstration
    console.log("Agreement data collected:", data)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Agreement</h2>
      </div>

      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              We advise you to wait with creating the agreement until all members have joined the team and connected
              their wallets. You can always add co-founders to the agreement after the registration. However, this will
              require a vote from the team.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agreementOptions.map((option) => (
          <Card
            key={option.id}
            className={`border-border bg-card hover:border-${option.color}/50 transition-colors overflow-hidden flex flex-col group cursor-pointer`}
            onClick={() => handleSelectAgreement(option)}
          >
            <div className={`h-1 bg-${option.color}`}></div>
            <CardContent className="p-6 flex-1">
              <h3 className="text-xl font-bold mb-2 text-foreground">{option.title}</h3>
              <p className="text-muted-foreground mb-6">{option.description}</p>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className={`p-6 pt-0 mt-auto border-t border-border group-hover:border-${option.color}/20`}>
              <Button variant="link" className={`text-${option.color} hover:text-${option.color}/80 p-0`}>
                Learn more →
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedAgreement && (
        <AgreementWizardModal
          agreement={selectedAgreement}
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          onSubmit={handleSubmitAgreement}
        />
      )}

      {agreementData && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Check className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium text-green-800">Agreement created successfully!</h3>
          </div>
          <p className="text-green-700 mb-4">
            Your {selectedAgreement?.title} has been created and is pending signatures from all co-founders.
          </p>
        </div>
      )}
    </div>
  )
}

interface AgreementOption {
  id: string
  title: string
  description: string
  features: string[]
  color: string
  recommended: boolean
}
