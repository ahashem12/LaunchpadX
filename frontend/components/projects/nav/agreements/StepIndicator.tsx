interface Step {
  id: string
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-sm ${index <= currentStep ? "text-white" : "text-gray-500"}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
      <div
        className="absolute top-4 left-0 h-0.5 bg-green-600 -translate-y-1/2 z-0 transition-all duration-300"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      ></div>
    </div>
  )
}
