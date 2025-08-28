"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BasicInfoTab } from "./BasicInfoTab"
import { CompensationTab } from "./CompensationTab"
import { FormErrorAlert } from "./FormErrorAlert"
import { AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"

interface CreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
}

export function CreateRoleModal({ isOpen, onClose, projectId }: CreateRoleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roleData, setRoleData] = useState({
    title: "",
    description: "",
    role_type: "",
    role_category: "",
    required_skills: [] as string[],
    flat_money_min: undefined,
    flat_money_max: undefined,
    equity_percentage: undefined,
  })

  const handleDataChange = (field: string, value: any) => {
    setError(null) // Clear error on new input
    setRoleData((prev) => ({ ...prev, [field]: value }))
  }

  const validateData = () => {
    if (!roleData.title.trim()) return "Role Title is required."
    if (!roleData.role_type) return "Role Type is required."
    if (!roleData.role_category) return "Role Category is required."
    if (!roleData.description.trim()) return "Role description is required."
    if (roleData.required_skills.length === 0 || (roleData.required_skills.length === 1 && roleData.required_skills[0] === "")) return "At least one required skill is necessary."
    return null
  }

  const handleSubmit = async () => {
    const validationError = validateData()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to create a role.", variant: "destructive" })
      setIsLoading(false)
      return
    }

    const { error: insertError } = await supabase.from("roles").insert({
      project_id: projectId,
      category_id: roleData.role_category,
      type_id: roleData.role_type,
      title: roleData.title,
      description: roleData.description,
      required_skills: roleData.required_skills,
      created_by: user.id,
      flat_money_min: roleData.flat_money_min,
      flat_money_max: roleData.flat_money_max,
      equity_percentage: roleData.equity_percentage,
    })

    setIsLoading(false)

    if (error) {
      console.error("Error creating role:", error)
      toast({ title: "Error", description: "Failed to create role. Please check the console for details.", variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Role created successfully!" })
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0 bg-card border-border text-foreground">
        <div className="sticky top-0 bg-card z-10 px-6 py-4 border-b border-border">
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground">Create Role</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-4">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-300 text-sm">
                If you want to hire freelancers, make sure you have a co-founder agreement and enough tokens in the
                project Treasury.
              </p>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full bg-muted p-1 rounded-lg mb-6">
              <TabsTrigger
                value="basic"
                className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="compensation"
                className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
              >
                Compensation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfoTab data={roleData} onDataChange={handleDataChange} />
            </TabsContent>

            <TabsContent value="compensation">
              <CompensationTab data={roleData} onDataChange={handleDataChange} />
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-xs text-muted-foreground">Fields marked with an asterisk (*) are required.</div>

          <FormErrorAlert message={error} />
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border text-foreground hover:bg-muted hover:text-foreground"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
