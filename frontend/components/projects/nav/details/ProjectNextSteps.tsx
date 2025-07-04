export function ProjectNextSteps() {
  const steps = [
    "Consulti: Describe your idea to the community",
    "Consulti: Update your project's visual identity by adding a banner",
    "Consulti: Describe your idea to the community",
    "Consulti: Update your project's visual identity by adding a banner",
    "Consulti: Provide a presentation video",
    "Consulti: Provide a presentation video",
  ]


  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Next Steps</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xl">AI</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{step}</p>
            </div>
            <div className="text-gray-400">
              <span>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
