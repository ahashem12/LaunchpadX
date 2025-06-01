interface NextStepContentProps {
  description: string
  buttonText?: string
}

export function NextStepContent({ description, buttonText }: NextStepContentProps) {
  return (
    <div className="space-y-2 text-sm text-gray-300">
      <p>{description}</p>
      {buttonText && (
        <button className="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition">
          {buttonText}
        </button>
      )}
    </div>
  )
}
