import { WatermelonIcon } from "@/components/icons/WatermelonIcon"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <WatermelonIcon size={32} className="text-white rotate-[145deg]" />
      <span className="text-xl font-bold text-white">Consulti</span>
    </div>
  )
}
