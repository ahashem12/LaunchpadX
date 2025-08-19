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
import { CheckCircle2 } from "lucide-react"


export function JoinWaitingList() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "phoneNumber" && errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: "" })
    }
    if (name === "confirmPassword" && errors.password) {
      setErrors({ ...errors, password: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, password: "Passwords do not match." })
      setIsLoading(false)
      return
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      setErrors({ ...errors, phoneNumber: "Please enter a valid phone number." })
      setIsLoading(false)
      return
    }
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?signup=success`,
      },
    })

    if (signUpError) {
      setIsLoading(false)
      let description = "Something went wrong. Please try again."
      if (signUpError.message.includes("User already registered")) {
        description = "A user with this email already exists. Please try logging in."
      } else if (signUpError.message.includes("Password should be at least 6 characters")) {
        description = "Your password is too weak. Please use at least 6 characters."
      } else if (signUpError.code === "email_address_invalid") {
        description = "The email address you entered is invalid. Please provide a valid email."
      }
      toast({
        title: "Sign-up Error",
        description,
        variant: "destructive",
      })
      return
    }

    const { error: insertError } = await supabase
      .from("profiles")
      .insert({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        city: formData.city,
        expertise: formData.expertise,
        joiningReason: formData.joiningReason,
      })

    setIsLoading(false)

    if (insertError) {
      console.error("Error inserting into waiting list:", insertError)
      let description = "Could not save your information. Please try again."
      if (insertError.code === "23505") {
        description = "This email address has already been added to the waiting list."
      } else if (insertError.code === "42501") {
        description = "You do not have permission to perform this action."
      }
      toast({
        title: "Database Error",
        description,
        variant: "destructive",
      })
    } else {
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        console.error("Error signing out:", signOutError)
        toast({
          title: "Logout Error",
          description: "Could not log you out after signing up. Please try logging out manually.",
          variant: "destructive",
        })
      }

      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="items-center text-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription className="text-muted-foreground">
                Please check your email to confirm your account. You'll be notified once an admin has approved your request.
              </CardDescription>
            </div>
            <Button 
              onClick={() => router.push('/login')}
              className="w-full mt-4"
            >
              Go to Login
            </Button>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start pt-12 sm:pt-16 md:pt-4 md:pb-24 lg:w-full">

      <Card className="w-full max-w-lg md:max-w-3xl lg:max-w-7xl">
        <CardHeader className="items-center text-center">
          <Logo />
          <CardTitle className="text-2xl">Join the Waiting List</CardTitle>
          <CardDescription>Be the first to know when we launch.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* Name */}
              <div className="space-y-2 py-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your First Name"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Family Name */}
              <div className="space-y-2 py-4">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your Family Name"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-4">
              {/* Email */}
              <div className="space-y-2 py-4">
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
              <div className="space-y-2 py-4">
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
            </div>

            <div className="grid md:grid-cols-2 md:gap-4">
              {/* Password */}
              <div className="space-y-2 py-4">
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

              {/* Confirm Password */}
              <div className="space-y-2 py-4">
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
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              {/* City of Residence */}
              <div className="space-y-2 py-4">
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
              <div className="space-y-2 py-4">
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
            </div>

            {/* Joining Reason (single-choice radios) */}
            <div className="space-y-3 py-4">
              <Label>Are you joining LPX to:</Label>
              <div className="flex flex-col pl-2 space-y-1">
                {[
                  "Be matched with projects",
                  "Build Projects",
                  'Contribute Expertise - "Know how"',
                  "Become a Partner",
                ].map(reason => (
                  <label key={reason} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="joiningReason"
                      value={reason}
                      checked={formData.joiningReason === reason}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="mr-2"
                    />
                    {reason}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-full md:w-1/2" disabled={isLoading}>
                {isLoading ? "Joining..." : "Join Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}