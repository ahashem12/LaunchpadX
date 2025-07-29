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

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("example@example.com")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  // Check if in development mode
  const isDev = process.env.NODE_ENV === 'development'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    isDev && setDebugInfo(null) // Only clear in dev

    try {
      if (email === "example@example.com" && password === "password") {
        document.cookie = "mock_auth=true; path=/; max-age=86400"
        isDev && setDebugInfo("Using mock authentication. Redirecting to dashboard...")

        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
        return
      }

      const supabase = createClient()
      isDev && setDebugInfo("Attempting Supabase authentication...")

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        isDev && setDebugInfo(`Authentication error: ${authError.message}`)
        return
      }

      isDev && setDebugInfo(
        `Authentication successful. User: ${data.user?.email}. Redirecting to dashboard...`,
      )

      setTimeout(() => {
        router.push("/dashboard")
        router.refresh()
      }, 1000)
    } catch (error: any) {
      setError("An unexpected error occurred")
      isDev && setDebugInfo(`Unexpected error: ${error.message || "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-[#1E1E1E] rounded-lg border border-[#2A2A2A] p-8">
      <div className="flex flex-col items-center mb-8">
        <WatermelonIcon size={180} className="text-white rotate-[145deg]" /> {/* Replaced PNG with SVG */}
        <h2 className="text-2xl font-bold text-white">LPX</h2>
      </div>

      <h1 className="text-2xl font-bold text-center text-white mb-2">Sign in to your account</h1>
      <p className="text-center text-gray-400 mb-6">Enter your email and password to sign in</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm text-watermelon-green hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#121212] border-[#2A2A2A] text-white"
            />
          </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      {isDev && debugInfo && (
        <div className="text-xs text-gray-400 p-2 bg-gray-800 rounded mt-2 overflow-auto max-h-24">
          {debugInfo}
        </div>
      )}

          <Button
            type="submit"
            className="w-full bg-watermelon-green hover:bg-watermelon-green/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-green-500 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}
