"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WatermelonIcon } from "../icons/WatermelonIcon"

export function ChangePasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        setError(updateError.message)
      } else {
        // Sign them out so they can log in again with the new password
        await supabase.auth.signOut()
        setSuccess("Password updated successfully! Redirecting to login…")
        setTimeout(() => router.push("/login"), 1500)
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-[#1E1E1E] rounded-lg border border-[#2A2A2A] p-8">
      <div className="flex flex-col items-center mb-8">
        <WatermelonIcon size={180} className="text-white rotate-[145deg]" />
        <h2 className="text-2xl font-bold text-white">LPX</h2>
      </div>

      <h1 className="text-2xl font-bold text-center text-white mb-2">Change your password</h1>
      <p className="text-center text-gray-400 mb-6">Enter your new password below</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#121212] border-[#2A2A2A] text-white"
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-[#121212] border-[#2A2A2A] text-white"
              minLength={6}
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}
          {success && <div className="text-sm text-green-500">{success}</div>}

          <Button
            type="submit"
            className="w-full bg-watermelon-green hover:bg-watermelon-green/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
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
