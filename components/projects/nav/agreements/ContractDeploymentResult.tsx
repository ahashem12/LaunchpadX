"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, ExternalLink } from "lucide-react"
import { useState } from "react"
import { aosisService } from "@/app/services/aosis-service"

interface ContractDeploymentResultProps {
  tokenAddress: string
  transactions: Array<{
    to: string
    amount: string
    txHash: string
  }>
  onClose: () => void
}

export function ContractDeploymentResult({ tokenAddress, transactions, onClose }: ContractDeploymentResultProps) {
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [copiedTx, setCopiedTx] = useState<string | null>(null)

  const copyToClipboard = async (text: string, type: "address" | "tx", id?: string) => {
    await navigator.clipboard.writeText(text)
    if (type === "address") {
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    } else if (type === "tx" && id) {
      setCopiedTx(id)
      setTimeout(() => setCopiedTx(null), 2000)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Agreement Successfully Deployed!</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your agreement has been successfully deployed to the Oasis Sapphire blockchain. The document is stored on IPFS
          and linked to your smart contract.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Smart Contract Card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Smart Contract</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your agreement is now represented by this smart contract on the Oasis Sapphire blockchain.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
              <code className="text-sm break-all">{tokenAddress || "Contract address not available"}</code>
              <button
                onClick={() => copyToClipboard(tokenAddress, "address")}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => window.open(aosisService.getTokenExplorerUrl(tokenAddress), "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agreement Document Card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Agreement Document</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your agreement document is stored on IPFS, a decentralized storage network.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
              <code className="text-sm">Document CID not available</code>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Copy className="h-4 w-4" />
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" className="flex items-center" disabled>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Document
              </Button>
            </div>

            <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Contract Address on Sapphire Testnet
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex justify-between items-center">
                <code className="text-xs break-all">{tokenAddress}</code>
                <button
                  onClick={() => copyToClipboard(tokenAddress, "address")}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="mt-2 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 dark:text-blue-400"
                  onClick={() => window.open(aosisService.getTokenExplorerUrl(tokenAddress), "_blank")}
                >
                  View on Sapphire Explorer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Oasis Sapphire Transactions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The following transactions were executed on the Oasis Sapphire blockchain to distribute tokens to
            co-founders.
          </p>

          <div className="space-y-6">
            {transactions.map((tx, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Transaction {index + 1}</h3>
                  <button
                    onClick={() => copyToClipboard(tx.txHash, "tx", `tx-${index}`)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recipient</p>
                    <code className="text-xs break-all bg-gray-100 dark:bg-gray-800 p-1 rounded">{tx.to}</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</p>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">{tx.amount}</code>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transaction Hash</p>
                  <code className="text-xs break-all bg-gray-100 dark:bg-gray-800 p-1 rounded block">{tx.txHash}</code>
                </div>

                <div className="mt-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center ml-auto"
                    onClick={() => window.open(aosisService.getTransactionExplorerUrl(tx.txHash), "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Transaction
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white" size="lg">
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
