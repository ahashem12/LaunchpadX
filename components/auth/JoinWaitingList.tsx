"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


export function JoinWaitingList() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    city: "",
    expertise: "",
    joiningReason: "",       // single choice
  })
  const [errors, setErrors] = useState({ phoneNumber: "", password: "" })
  const supabase = createClient()
  const router = useRouter()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === "phoneNumber" && errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: "" })
    }
    if (name === "confirmPassword" && errors.password) {
      setErrors({ ...errors, password: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, password: "Passwords do not match." })
      return
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      setErrors({ ...errors, phoneNumber: "Please enter a valid phone number." })
      return
    }

    setIsLoading(true)

    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setIsLoading(false)
      toast({
        title: "Error",
        description: signUpError.message,
        variant: "destructive",
      })
      return
    }

    const { error: insertError } = await supabase.from("waiting_list").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber,
    })

    setIsLoading(false)

    if (insertError) {
      console.error("Error inserting into waiting list:", insertError)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } else {
      setIsSubmitted(true)
      setTimeout(() => router.push("/"), 3000)

    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="items-center text-center">
            <Logo />
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>
              Please check your email to confirm your account. You will be notified once an admin has approved your request.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Logo />
          <CardTitle className="text-2xl">Join the Waiting List</CardTitle>
          <CardDescription>Be the first to know when we launch.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                disabled={isLoading}
              />
            </div>

            {/* Family Name */}
            <div className="space-y-2">
              <Label htmlFor="familyName">Family Name</Label>
              <Input
                id="familyName"
                name="familyName"
                value={formData.familyName}
                onChange={handleInputChange}
                placeholder="Your Family Name"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="(555) 555-5555"
                required
                disabled={isLoading}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 pt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* City of Residence */}
            <div className="space-y-2">
              <Label htmlFor="city">City of Residence</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Your City"
                required
                disabled={isLoading}
              />
            </div>

            {/* Field Of Expertise */}
            <div className="space-y-2">
              <Label htmlFor="expertise">Field Of Expertise</Label>
              <select
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary !text-black"
                style={{ color: "#000" }}
              >
                <option value="" className="text-black">Select your expertise</option>
                <option value="Tech" className="text-black">Tech</option>
                <option value="Business" className="text-black">Business</option>
                <option value="Content building" className="text-black">Content building</option>
                <option value="Data" className="text-black">Data</option>
                <option value="Other" className="text-black">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-red-500 pt-1">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Joining..." : "Join Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
