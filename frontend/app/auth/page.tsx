"use client"
import { useState } from "react"
import AuthForm from "@/components/auth/auth-form"
import { Building2 } from "lucide-react"

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-blue-600 p-3 rounded-full mb-4">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Business AI Consultant</h1>
      </div>

      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        onToggleMode={() => setMode(mode === "signin" ? "signup" : "signin")}
      />
    </div>
  )
}