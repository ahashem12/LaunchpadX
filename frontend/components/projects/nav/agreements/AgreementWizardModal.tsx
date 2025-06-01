"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, FileText, Loader2, Rocket } from "lucide-react"
import type { AgreementOption, AgreementData } from "@/types/agreements"
import { ContractDeploymentResult } from "./ContractDeploymentResult"
import { StepIndicator } from "./StepIndicator"
import { DeployAgreementStep } from "./steps/DeployAgreementStep"
import { UploadDocumentStep } from "./steps/UploadDocumentStep"
import { OrganizationStep } from "./steps/OrganizationStep"
import { EquityStep } from "./steps/EquityStep"
import { GovernanceStep } from "./steps/GovernanceStep"
import { SummaryStep } from "./steps/SummaryStep"
import { RegisterStep } from "./steps/RegisterStep"
import { DialogTitle } from "@radix-ui/react-dialog"

interface AgreementWizardModalProps {
  agreement: AgreementOption
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AgreementData) => void
}

export function AgreementWizardModal({ agreement, isOpen, onClose, onSubmit }: AgreementWizardModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [agreementData, setAgreementData] = useState<AgreementData>({
    organization: {
      name: "Consulti",
      tokenName: "ConsToken",
      tokenSymbol: "ConTKN",
      tokenDecimals: 8,
      coFounders: [
        { id: "user-1", name: "(You) suzo3", role: "CEO - Business", tag: "CREATOR", avatar: "/user-avatar-1.png" },
        { id: "user-2", name: "ahmadhashem2806", role: "CTO - Technical", avatar: "/diverse-user-avatar-set-2.png" },
      ],
    },
    equity: {
      limitTokenAmount: false,
      totalTokens: 1000000,
      enableVesting: false,
      allocations: [
        { userId: "user-1", percentage: 50, tokenAmount: 500000 },
        { userId: "user-2", percentage: 50, tokenAmount: 500000 },
      ],
    },
    governance: {
      model: "proportional",
    },
    document: {
      file: null,
      name: "",
      size: 0,
      ipfsCid: "",
      uploading: false,
      uploaded: false,
    },
  })

  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentError, setDeploymentError] = useState<string | null>(null)
  const [deploymentResult, setDeploymentResult] = useState<any | null>(null)

  const steps = [
    { id: "organisation", title: "Organisation" },
    { id: "equity", title: "Equity" },
    { id: "governance", title: "Governance" },
    { id: "summary", title: "Summary" },
    { id: "register", title: "Register" },
    { id: "upload", title: "Upload" },
    { id: "deploy", title: "Deploy" },
  ]

  const updateAgreementData = (section: keyof AgreementData, data: any) => {
    setAgreementData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const handleUploadDocument = async (file: File) => {
    if (!file) return

    updateAgreementData("document", {
      file,
      name: file.name,
      size: file.size,
      uploading: true,
      uploaded: false,
    })

    // Simulate IPFS upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock IPFS CID
    const mockIpfsCid = "bafkreihdwcefg4dqajvb7uzcmw7ojeedveuznetojusjwjtenvqvyku"

    updateAgreementData("document", {
      uploading: false,
      uploaded: true,
      ipfsCid: mockIpfsCid,
    })
  }

  const handleDeployContract = async () => {
    if (currentStep !== steps.length - 1) {
      handleNext()
      return
    }

    setIsDeploying(true)
    setDeploymentError(null)

    try {
      // Define wallet addresses for the recipients
      // In a real app, you would get these from the connected wallets
      const walletAddresses = {
        "user-1": "0x18c377af564763fbf43f877ccf0122d489daefcc", // First cofounder
        "user-2": "0x1D945560EEF548217A5945A4176dde2259378008", // Second cofounder
        platform: "0x5A58F1C8743220dD5732699ed516bb985ae2Bf1A", // Platform fee recipient
      }

      // Prepare recipients array from coFounders and allocations
      const recipients = agreementData.equity.allocations.map((allocation) => {
        return {
          address: walletAddresses[allocation.userId as keyof typeof walletAddresses],
          percentage: allocation.percentage,
        }
      })

      // Add platform fee recipient (for demonstration)
      const totalPercentage = recipients.reduce((sum, r) => sum + r.percentage, 0)
      const platformPercentage = 100 - totalPercentage

      if (platformPercentage > 0) {
        recipients.push({
          address: walletAddresses.platform,
          percentage: platformPercentage,
        })
      }

      // Prepare deployment input
      const deploymentInput = {
        name: agreementData.organization.name,
        symbol: agreementData.organization.tokenSymbol,
        decimals: agreementData.organization.tokenDecimals,
        initialSupply: agreementData.equity.totalTokens,
        recipients: recipients,
        ipfsCid: agreementData.document?.ipfsCid,
      }

      console.log("Deploying token with input:", deploymentInput)

      // Call the API endpoint to deploy the token
      const response = await fetch("http://akovdtzkof.a.pinggy.link/deploy-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deploymentInput),
      })

      if (!response.ok) {
        throw new Error(`Deployment failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Deployment result:", result)
      setDeploymentResult(result)
    } catch (error) {
      console.error("Error deploying contract:", error)
      setDeploymentError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsDeploying(false)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleDeployContract()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onClose()
    }
  }

  const handleSubmit = () => {
    // Pass the collected data to the parent component
    onSubmit(agreementData)
    onClose()
  }

  if (deploymentResult) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[900px] p-6 bg-background">
          <ContractDeploymentResult
            tokenAddress={deploymentResult.tokenAddress}
            transactions={deploymentResult.transactions}
            onClose={() => {
              setDeploymentResult(null)
              onSubmit(agreementData)
              onClose()
            }}
          />
        </DialogContent>
      </Dialog>
    )
  }

  const getButtonText = () => {
    if (isDeploying) {
      return (
        <span className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deploying...
        </span>
      )
    }

    switch (currentStep) {
      case 5: // Upload Document step
        return (
          <span className="flex items-center">
            <Check className="mr-2 h-4 w-4" /> Continue
          </span>
        )
      case 6: // Deploy Agreement step
        return (
          <span className="flex items-center">
            <Rocket className="mr-2 h-4 w-4" /> Deploy Agreement
          </span>
        )
      default:
        return (
          <span className="flex items-center">
            <Check className="mr-2 h-4 w-4" /> Continue
          </span>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 bg-background">
        <DialogTitle className="sr-only">{/* New {agreement.title} */}</DialogTitle>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold">New {agreement.title}</h2>
          </div>
        </div>

        <div className="p-6 border-b">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {currentStep === 0 && (
            <OrganizationStep
              data={agreementData.organization}
              updateData={(data) => updateAgreementData("organization", data)}
            />
          )}
          {currentStep === 1 && (
            <EquityStep
              data={agreementData.equity}
              coFounders={agreementData.organization.coFounders}
              updateData={(data) => updateAgreementData("equity", data)}
            />
          )}
          {currentStep === 2 && (
            <GovernanceStep
              data={agreementData.governance}
              updateData={(data) => updateAgreementData("governance", data)}
            />
          )}
          {currentStep === 3 && <SummaryStep data={agreementData} />}
          {currentStep === 4 && <RegisterStep agreement={agreement} data={agreementData} />}
          {currentStep === 5 && agreementData.document && (
            <UploadDocumentStep document={agreementData.document} onUpload={handleUploadDocument} />
          )}
          {currentStep === 6 && <DeployAgreementStep data={agreementData} />}
        </div>

        <div className="flex items-center justify-between p-6 border-t">
          <div></div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleBack} disabled={isDeploying}>
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={handleNext}
              className={
                currentStep === 6
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }
              disabled={isDeploying || (currentStep === 5 && !agreementData.document?.uploaded)}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
