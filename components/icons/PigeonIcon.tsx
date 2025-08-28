import Image from "next/image"

export function PigeonIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/Pigeon.png"
      alt="Pigeon"
      width={size}
      height={size}
      className={className}
    />
  )
}

export function PigeonSliceIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/Pigeon.png"
      alt="Pigeon"
      width={size}
      height={size}
      className={className}
    />
  )
}
