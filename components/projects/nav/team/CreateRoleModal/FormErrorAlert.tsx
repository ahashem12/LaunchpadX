export function FormErrorAlert() {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
      <div className="flex items-center space-x-2">
        <div className="h-5 w-5 rounded-full bg-red-500 text-primary-foreground flex items-center justify-center text-xs">
          !
        </div>
        <p className="text-red-400 text-sm">Role Category is required.</p>
      </div>
    </div>
  )
}
