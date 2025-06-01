"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  view: "grid" | "list"
  onChange: (view: "grid" | "list") => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-border p-1">
      <Button
        variant="ghost"
        size="icon"
        className={view === "grid" ? "bg-muted" : ""}
        onClick={() => onChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={view === "list" ? "bg-muted" : ""}
        onClick={() => onChange("list")}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  )
}
