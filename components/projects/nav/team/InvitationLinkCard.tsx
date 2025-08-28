"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function InvitationLinkCard() {
  const [copied, setCopied] = useState(false)
  const invitationLink = "LPX.IO"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Invitation link copied to clipboard.",
      })
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      })
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-2 text-foreground">Invitation Link</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative flex-1">
                <code className="text-sm bg-muted/50 p-2 pl-3 pr-10 rounded-md text-foreground flex-1 font-mono block truncate">
                  {invitationLink}
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/20"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this link to invite team members. Avoid sharing in public spaces.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}