import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export function InvitationLinkCard() {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-2 text-foreground">Invitation Link</h3>
            <div className="flex items-center mt-1">
              <code className="text-xs bg-muted p-2 rounded text-muted-foreground flex-1 font-mono">
                https://app.foundance.org/projects/invite/QpPQz0Ldf-n4dJute-fk4M?invitationCode=MrSdkBPDZT
              </code>
              <Button variant="ghost" size="sm" className="ml-2 text-muted-foreground hover:text-foreground">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Use this link to invite people to join you as team members. Invitations are automatically adjusted to be
              shared about sharing it in public spaces.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
