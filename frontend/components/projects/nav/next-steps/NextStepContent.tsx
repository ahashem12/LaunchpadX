
interface NextStepContentProps {
  description: string
  stepId: string
  onDelete: (id: string) => void
}

export function NextStepContent({ description }: NextStepContentProps) {

  return (
    <>
      <div className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </>
  )
}