"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import type { AgreementData } from "@/types/agreements"

interface DeployAgreementStepProps {
  data: AgreementData
}

export function DeployAgreementStep({ data }: DeployAgreementStepProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Deploy Agreement</h2>
        <p className="text-gray-500 mb-4">
          Review your agreement details and deploy your smart contract to the Oasis Sapphire blockchain. This will
          create a token that represents equity in your organization and links to your agreement document.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Organization Name</h3>
            <p className="text-lg font-medium">{data.organization.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Token Name</h3>
            <p className="text-lg font-medium">{data.organization.tokenName}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Token Symbol</h3>
            <p className="text-lg font-medium">{data.organization.tokenSymbol}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Agreement Type</h3>
            <p className="text-lg font-medium">Standard</p>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Document</h3>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-lg font-medium">{data.document?.name}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">IPFS CID</h3>
            <p className="text-sm font-mono bg-gray-100 p-2 rounded">{data.document?.ipfsCid}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
