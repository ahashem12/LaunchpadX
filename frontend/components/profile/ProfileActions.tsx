"use client"

import { Button } from "@/components/ui/button"
import { Save, RotateCcw, Loader2 } from "lucide-react"

interface ProfileActionsProps {
  onSave: () => void
  onDiscard: () => void
  saving: boolean
  hasChanges: boolean
}

export function ProfileActions({ onSave, onDiscard, saving, hasChanges }: ProfileActionsProps) {
  return (
    <div className="rounded-lg border p-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <Button onClick={onSave} disabled={saving || !hasChanges} className="w-full">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onDiscard}
            disabled={saving || !hasChanges}
            className="w-full bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Discard Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
