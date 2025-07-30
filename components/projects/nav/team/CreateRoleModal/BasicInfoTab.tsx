import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

interface RoleType {
  id: string
  name: string
}

interface RoleCategory {
  id: string
  name: string
}

interface BasicInfoTabProps {
  data: {
    title: string
    description: string
    role_type: string
    role_category: string
    required_skills: string[]
  }
  onDataChange: (field: string, value: string | string[]) => void
}

export function BasicInfoTab({ data, onDataChange }: BasicInfoTabProps) {
  const [roleTypes, setRoleTypes] = useState<RoleType[]>([])
  const [roleCategories, setRoleCategories] = useState<RoleCategory[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchDropdownData = async () => {
      const { data: typesData, error: typesError } = await supabase.from("role_types").select("id, name")
      if (typesError) {
        console.error("Error fetching role types:", typesError)
      } else {
        setRoleTypes(typesData)
      }

      const { data: categoriesData, error: categoriesError } = await supabase.from("role_categories").select("id, name")
      if (categoriesError) {
        console.error("Error fetching role categories:", categoriesError)
      } else {
        setRoleCategories(categoriesData)
      }
    }

    fetchDropdownData()
  }, [supabase])

  return (
    <div className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
      <div>
        <Label htmlFor="role-type" className="text-foreground">
          Role Type <span className="text-red-500">*</span>
        </Label>
        <Select value={data.role_type} onValueChange={(value) => onDataChange("role_type", value)}>
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select a Role Type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            {roleTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role-category" className="text-foreground">
          Role Category <span className="text-red-500">*</span>
        </Label>
        <Select value={data.role_category} onValueChange={(value) => onDataChange("role_category", value)}>
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            {roleCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title" className="text-foreground">
          Role Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onDataChange("title", e.target.value)}
          className="mt-1.5 bg-muted border-border text-foreground"
          placeholder="e.g., Lead Frontend Developer"
        />
      </div>

      <div>
        <Label htmlFor="required-skills" className="text-foreground">
          Required skills <span className="text-red-500">*</span>
        </Label>
        <Input
          id="required-skills"
          value={data.required_skills.join(", ")}
          onChange={(e) => onDataChange("required_skills", e.target.value.split(",").map((s) => s.trim()))}
          className="mt-1.5 bg-muted border-border text-foreground"
          placeholder="React, TypeScript, Tailwind CSS"
        />
        <p className="text-xs text-muted-foreground mt-1.5">Enter skills separated by commas.</p>
      </div>

      <div>
        <Label htmlFor="role-description" className="text-foreground">
          Role description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="role-description"
          value={data.description}
          onChange={(e) => onDataChange("description", e.target.value)}
          placeholder="Describe the role, responsibilities, and what you're looking for."
          className="resize-none mt-1.5 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          rows={4}
        />
      </div>
    </div>
  )
}
