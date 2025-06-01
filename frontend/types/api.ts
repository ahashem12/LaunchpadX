/**
 * API response and request types
 */

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  message?: string
}

export interface ApiError {
  message: string
  code?: string
  status: number
  details?: any
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CreateAgreementResponse {
  id: string
  status: string
}

export interface AgreementPreviewResponse {
  previewUrl: string
}

export interface SmartContractPreviewResponse {
  code: string
}
