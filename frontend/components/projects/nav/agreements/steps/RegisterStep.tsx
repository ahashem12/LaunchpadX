"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { AgreementData } from "@/types/agreements"
import { FileText } from "lucide-react"

interface AgreementOption {
  id: string
  title: string
  description: string
  features: string[]
  color: string
  recommended: boolean
}

interface RegisterStepProps {
  agreement: AgreementOption
  data: AgreementData
}

export function RegisterStep({ agreement, data }: RegisterStepProps) {
  const [agreementType, setAgreementType] = useState<"standard" | "light" | "custom">("standard")

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Document Preview</h2>
        <p className="text-gray-500 mb-4">
          Read the document in order to move forward to registering it. By clicking on "Register" button you hereby
          confirm that you have read and agreed with the terms and conditions stipulated in this contract. After
          registration, your co-founder(s) will be able to review and sign the agreement.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Agreement Type</h3>
        <div className="flex space-x-4">
          <Button
            variant={agreementType === "standard" ? "default" : "outline"}
            className={agreementType === "standard" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
            onClick={() => setAgreementType("standard")}
          >
            Standard
          </Button>
          <Button
            variant={agreementType === "light" ? "default" : "outline"}
            className={agreementType === "light" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
            onClick={() => setAgreementType("light")}
          >
            Light
          </Button>
          <Button
            variant={agreementType === "custom" ? "default" : "outline"}
            className={agreementType === "custom" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
            onClick={() => setAgreementType("custom")}
          >
            Custom
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">You have selected {agreementType} type agreement</p>
      </div>

      <Card className="border-gray-300 mb-8">
        <CardContent className="p-0">
          <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-mono">bc7b8597-ca06-4df3-a73c-cef3b18fe5ac</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>2 / 10</span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                  <span>-</span>
                </Button>
                <span>50%</span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
                  <span>+</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="h-96 bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg w-full h-full flex items-center justify-center">
              <div className="p-8 max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Agreement Preview</h2>
                <p className="mb-4">
                  The Stakeholders agree that the Governance Mechanism is the one defined in the smart contract and
                  chosen on the Foundation Platform (see Appendix A).
                </p>
                <p className="mb-4">
                  Generally, decisions regarding the Project are taken by the Executive Team OR (if applicable) by other
                  persons or entities when they have the Executive Team's approval. In that respect only tokens of the
                  Executive Team can participate in the vote.
                </p>
                <p className="mb-4">
                  All decisions regarding the Project that are not expressly attributed to the smart contract code (i.e.
                  those that require changes to the smart contract code), are to be discussed among the Executive Team
                  OR Stakeholders that hold their tokens on the Foundation Platform ("on-chain" decisions).
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Adding Stakeholders to the Stakeholders Agreement</li>
                  <li>Removing Stakeholders (according to their vesting)</li>
                  <li>Changing the distribution of tokens (if always distributed tokens of the first owner)</li>
                  <li>Changing parameters of the Stakeholders Agreement</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
