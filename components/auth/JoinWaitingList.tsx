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
    city: "",
    expertise: "",
    joiningReason: "",       // single choice
  })
  const [errors, setErrors] = useState({ phoneNumber: "" })
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      setErrors({ phoneNumber: "Please enter a valid phone number." })
      return
    }

    setIsLoading(true)

    const { error } = await supabase
      .from("waiting_list")
      .insert({
        name: formData.name,
        familyName: formData.familyName,
        email: formData.email,
        phone: formData.phoneNumber,
        city: formData.city,
        expertise: formData.expertise,
        joiningReason: formData.joiningReason,
      })

    setIsLoading(false)

    if (error) {
      console.error("Error inserting into waiting list:", error)
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
            <CardDescription>You've joined the waiting list.</CardDescription>
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

            {/* Joining Reason (single-choice radios) */}
            <div className="space-y-2">
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Joining..." : "Join Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
