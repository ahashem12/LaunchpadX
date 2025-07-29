import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function BasicInfoTab() {
  return (
    <div className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
      <div>
        <Label htmlFor="role-type" className="text-foreground">
          Role Type <span className="text-red-500">*</span>
        </Label>
        <Select>
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Team Member" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            <SelectItem value="team-member">Team Member</SelectItem>
            <SelectItem value="co-founder">Co-Founder</SelectItem>
            <SelectItem value="freelancer">Freelancer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role-category" className="text-foreground">
          Role Category <span className="text-red-500">*</span>
        </Label>
        <Select>
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role" className="text-foreground">
          Role <span className="text-red-500">*</span>
        </Label>
        <Select>
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            <SelectItem value="cto">CTO</SelectItem>
            <SelectItem value="ceo">CEO</SelectItem>
            <SelectItem value="cmo">CMO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="required-skills" className="text-foreground">
          Required skills <span className="text-red-500">*</span>
        </Label>
        <Select>
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            <SelectItem value="programming">Programming</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role-description" className="text-foreground">
          Role description <span className="text-red-500">*</span>
          <span className="text-muted-foreground text-xs ml-2">Max. 200 Characters</span>
        </Label>
        <Textarea
          placeholder="Type the description"
          className="resize-none mt-1.5 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          rows={4}
        />
      </div>
    </div>
  )
}
