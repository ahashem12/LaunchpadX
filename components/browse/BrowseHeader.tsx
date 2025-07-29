"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BrowseHeader() {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Browse Projects</h1>
        <p className="text-muted-foreground mt-1">Discover and connect with innovative projects from the community.</p>
      </div>
      <Button
        onClick={() => router.push("/projects/new")}
        className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Project
      </Button>
    </div>
  )
}
