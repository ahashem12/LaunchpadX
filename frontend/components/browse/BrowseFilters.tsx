"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface BrowseFiltersProps {
  filters: {
    sortBy: string
    category: string
    events: string
    search: string
  }
  onFiltersChange: (filters: any) => void
}

export default function BrowseFilters({ filters, onFiltersChange }: BrowseFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-lg">
      {/* Sort and Filter Controls */}
      <div className="flex flex-wrap gap-3 flex-1">
        <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
          <SelectTrigger className="w-[140px] bg-background border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-[140px] bg-background border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="DAOS">DAOS</SelectItem>
            <SelectItem value="BLOCKCHAIN">Blockchain</SelectItem>
            <SelectItem value="CYBERSECURITY">Cybersecurity</SelectItem>
            <SelectItem value="AI">AI</SelectItem>
            <SelectItem value="FINTECH">FinTech</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.events} onValueChange={(value) => updateFilter("events", value)}>
          <SelectTrigger className="w-[140px] bg-background border-border">
            <SelectValue placeholder="Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="relative w-full lg:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by name..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10 bg-background border-border focus:border-primary"
        />
      </div>
    </div>
  )
}
