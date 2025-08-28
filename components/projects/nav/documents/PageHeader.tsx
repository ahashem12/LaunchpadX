import { FileText } from "lucide-react"

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
  )
}
