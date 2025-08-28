"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileText, X, Upload, Loader2 } from "lucide-react"

interface DocumentData {
  file: File | null
  name: string
  size: number
  ipfsCid: string
  uploading: boolean
  uploaded: boolean
}

interface UploadDocumentStepProps {
  document: DocumentData
  onUpload: (file: File) => void
}

export function UploadDocumentStep({ document, onUpload }: UploadDocumentStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onUpload(files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Upload Agreement Document</h2>
        <p className="text-gray-500 mb-4">
          Upload your agreement document to IPFS. This will create a permanent, decentralized record of your agreement
          that will be linked to your smart contract on the Oasis Sapphire blockchain.
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 flex flex-col items-center justify-center">
        {document.file ? (
          <div className="w-full">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <p className="font-medium">{document.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(document.size)}</p>
                </div>
              </div>
              <div className="flex items-center">
                {document.uploading ? (
                  <div className="flex items-center text-blue-500">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Uploading...</span>
                  </div>
                ) : document.uploaded ? (
                  <div className="text-green-500">Uploaded</div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-green-400 mb-4" />
            <p className="text-lg font-medium mb-2">Drag and drop your file here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Browse Files
            </Button>
          </>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
      </div>
    </div>
  )
}
