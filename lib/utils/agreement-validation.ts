import type { AgreementData } from "@/types/agreements"

export type ValidationErrors = {
  [key: string]: string
}

export function validateOrganizationStep(data: AgreementData["organization"]): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.name.trim()) {
    errors.name = "Organization name is required"
  }

  if (!data.tokenName.trim()) {
    errors.tokenName = "Token name is required"
  }

  if (!data.tokenSymbol.trim()) {
    errors.tokenSymbol = "Token symbol is required"
  } else if (data.tokenSymbol.length > 5) {
    errors.tokenSymbol = "Token symbol should be 5 characters or less"
  }

  if (data.tokenDecimals < 0 || data.tokenDecimals > 18) {
    errors.tokenDecimals = "Token decimals must be between 0 and 18"
  }

  if (data.coFounders.length < 1) {
    errors.coFounders = "At least one co-founder is required"
  }

  return errors
}

export function validateEquityStep(data: AgreementData["equity"]): ValidationErrors {
  const errors: ValidationErrors = {}

  if (data.totalTokens <= 0) {
    errors.totalTokens = "Total tokens must be greater than 0"
  }

  // Check if allocations add up to 100%
  const totalPercentage = data.allocations.reduce((sum, allocation) => sum + allocation.percentage, 0)
  if (Math.abs(totalPercentage - 100) > 0.01) {
    errors.allocations = `Total allocation must equal 100% (currently ${totalPercentage.toFixed(2)}%)`
  }

  // Check if any allocation is negative
  const hasNegativeAllocation = data.allocations.some(
    (allocation) => allocation.percentage < 0 || allocation.tokenAmount < 0,
  )
  if (hasNegativeAllocation) {
    errors.negativeAllocation = "Allocations cannot be negative"
  }

  return errors
}

export function validateGovernanceStep(data: AgreementData["governance"]): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.model) {
    errors.model = "Governance model is required"
  }

  return errors
}

export function validateAgreementData(data: AgreementData): ValidationErrors {
  return {
    ...validateOrganizationStep(data.organization),
    ...validateEquityStep(data.equity),
    ...validateGovernanceStep(data.governance),
  }
}
