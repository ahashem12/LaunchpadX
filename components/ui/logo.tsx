import { PigeonIcon } from "@/components/icons/PigeonIcon"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <PigeonIcon size={32} className="text-white" />
      <span className="text-xl font-bold text-white">LPX</span>
    </div>
  )
}
