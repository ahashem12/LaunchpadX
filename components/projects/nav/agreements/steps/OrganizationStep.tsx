"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"

interface OrganizationData {
  name: string
  tokenName: string
  tokenSymbol: string
  tokenDecimals: number
  coFounders: Array<{
    id: string
    name: string
    role: string
    tag?: string
    avatar?: string
  }>
}

interface OrganizationStepProps {
  data: OrganizationData
  updateData: (data: Partial<OrganizationData>) => void
}

export function OrganizationStep({ data, updateData }: OrganizationStepProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Organization Setup</h2>
      <p className="text-gray-500 mb-8">The first step is setting up your future organization.</p>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <Label htmlFor="organization-name" className="block mb-2">
            Organization Name <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="organization-name"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="Enter organization name"
            />
            {data.name && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => updateData({ name: "" })}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="token-name" className="block mb-2">
            Token Name <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="token-name"
              value={data.tokenName}
              onChange={(e) => updateData({ tokenName: e.target.value })}
              placeholder="Enter token name"
            />
            {data.tokenName && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => updateData({ tokenName: "" })}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="token-symbol" className="block mb-2">
            Token Symbol <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="token-symbol"
              value={data.tokenSymbol}
              onChange={(e) => updateData({ tokenSymbol: e.target.value })}
              placeholder="Enter token symbol"
            />
            {data.tokenSymbol && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => updateData({ tokenSymbol: "" })}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="token-decimals" className="block mb-2">
            Token Decimals
          </Label>
          <div className="relative">
            <Input
              id="token-decimals"
              type="number"
              value={data.tokenDecimals}
              onChange={(e) => updateData({ tokenDecimals: Number.parseInt(e.target.value) })}
              placeholder="Enter token decimals"
            />
            {data.tokenDecimals !== 8 && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => updateData({ tokenDecimals: 8 })}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-medium text-gray-500">
          <div>CO-FOUNDERS</div>
          <div>ROLE</div>
          <div>TAGS</div>
        </div>

        {data.coFounders.map((founder) => (
          <div key={founder.id} className="grid grid-cols-3 gap-4 py-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage src={founder.avatar || "/placeholder.svg"} alt={founder.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {founder.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{founder.name}</span>
            </div>
            <div className="flex items-center">{founder.role}</div>
            <div className="flex items-center">
              {founder.tag && (
                <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-none">{founder.tag}</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
