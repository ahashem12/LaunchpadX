"use client"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import { fileService } from "@/services/fileService"

const ALLOWED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt'
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface FileUploadProps {
  onSuccess?: () => void;
}

export default function FileUpload({ onSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const validateFile = (file: File) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 10MB"
    }

    // Check file type
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      return "File type not supported. Please upload PDF, DOCX, XLSX, or TXT files only."
    }

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const validationError = validateFile(selectedFile)
      
      if (validationError) {
        setError(validationError)
        return
      }

      setFile(selectedFile)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      const validationError = validateFile(droppedFile)
      
      if (validationError) {
        setError(validationError)
        return
      }

      setFile(droppedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await fileService.uploadFile(file)
      setResponse(result.message)
      setFile(null)
      onSuccess?.() // Call onSuccess when upload is complete
    } catch (error) {
      console.error("Error uploading file:", error)
      setError("Error uploading file. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Business Documents</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-48 border-2 
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-blue-300 bg-blue-50'}
              border-dashed rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-300`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className={`w-10 h-10 mb-3 ${isDragging ? 'text-blue-600' : 'text-blue-400'}`} />
              <p className="mb-2 text-sm text-blue-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-blue-500">PDF, DOCX, XLSX, or TXT (MAX. 10MB)</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={Object.values(ALLOWED_TYPES).join(',')}
            />
          </label>
        </div>
        {file && (
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>Selected file:</span>
            <span className="font-medium">{file.name}</span>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full flex items-center justify-center py-2 px-4 rounded-md transition duration-300 ${
            !file || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Upload and Analyze'
          )}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-blue-100 rounded-md text-blue-800">
          <h3 className="font-semibold mb-2">AI Analysis:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}