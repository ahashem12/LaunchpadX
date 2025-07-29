import { teamService } from "./team-service"

export interface AgreementValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export const agreementValidation = {
  /**
   * Validate if an agreement can be created or opened
   */
  validateAgreementAccess: async (projectId: string): Promise<AgreementValidationResult> => {
    const result: AgreementValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    try {
      // Check if at least two co-founders have connected wallets
      const coFoundersWithWallets = await teamService.countCoFoundersWithWallets(projectId)

      if (coFoundersWithWallets < 2) {
        result.isValid = false
        result.errors.push(
          `At least two co-founders must connect their wallets before creating or accessing agreements. Currently, ${coFoundersWithWallets} co-founder(s) have connected wallets.`,
        )
      }

      // Add any additional validations here

      return result
    } catch (error) {
      console.error("Error validating agreement access:", error)
      result.isValid = false
      result.errors.push("An error occurred while validating agreement access. Please try again.")
      return result
    }
  },

  /**
   * Validate if an agreement can be signed
   */
  validateAgreementSigning: async (projectId: string, userId: string): Promise<AgreementValidationResult> => {
    const result: AgreementValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    try {
      // First check general agreement access
      const accessValidation = await agreementValidation.validateAgreementAccess(projectId)
      if (!accessValidation.isValid) {
        return accessValidation
      }

      // Check if the user has connected their wallet
      const teamMembers = await teamService.getProjectTeamMembers(projectId)
      const userTeamMember = teamMembers.find((member) => member.user_id === userId)

      if (!userTeamMember) {
        result.isValid = false
        result.errors.push("You are not a member of this project and cannot sign agreements.")
        return result
      }

      if (!userTeamMember.has_connected_wallet) {
        result.isValid = false
        result.errors.push("You must connect your wallet before signing agreements.")
      }

      // Add any additional validations here

      return result
    } catch (error) {
      console.error("Error validating agreement signing:", error)
      result.isValid = false
      result.errors.push("An error occurred while validating agreement signing. Please try again.")
      return result
    }
  },
}
