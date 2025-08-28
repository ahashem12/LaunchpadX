"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PigeonIcon } from "../icons/PigeonIcon"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()
    
      const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${(process.env.NEXT_PUBLIC_APP_URL || window.location.origin)}/callback?next=/change-password`,
    });

    if (error) setError(error)
    else setSuccess("Check your email for a password reset link.")
    } catch (error) {   
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-[#1E1E1E] rounded-lg border border-[#2A2A2A] p-8">
      <div className="flex flex-col items-center mb-8">
        <PigeonIcon size={180} className="text-white" />
        <h2 className="text-2xl font-bold text-white">LPX</h2>
      </div>

      <h1 className="text-2xl font-bold text-center text-white mb-2">Forgot your password?</h1>
      <p className="text-center text-gray-400 mb-6">Enter your email address and we'll send you a link to reset your password</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#121212] border-[#2A2A2A] text-white"
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}
          {success && <div className="text-sm text-green-500">{success}</div>}

          <Button
            type="submit"
            className="w-full bg-watermelon-green hover:bg-watermelon-green/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Remember your password?{" "}
        <Link href="/login" className="text-green-500 hover:underline">Sign in</Link>
      </div>
    </div>
  )
}
