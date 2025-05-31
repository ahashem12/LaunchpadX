export function WatermelonIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Semi-circular watermelon shape */}
      <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12H2Z" fill="#FF4136" />
      {/* White/light green rind */}
      <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12H3Z" fill="#E2FFDB" />
      {/* Red flesh */}
      <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12H4Z" fill="#FF4136" />
      {/* Dark green outer edge */}
      <path
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12H2Z"
        stroke="#007A3D"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Seeds */}
      <ellipse cx="8" cy="7" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="12" cy="6" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="16" cy="7" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="6.5" cy="9.5" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="10.5" cy="9" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="14.5" cy="9" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="18" cy="9.5" rx="0.8" ry="1.2" fill="black" />
    </svg>
  )
}

export function WatermelonSliceIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Semi-circular watermelon shape */}
      <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12H2Z" fill="#FF4136" />
      {/* White/light green rind */}
      <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12H3Z" fill="#E2FFDB" />
      {/* Red flesh */}
      <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12H4Z" fill="#FF4136" />
      {/* Dark green outer edge */}
      <path
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12H2Z"
        stroke="#007A3D"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Seeds */}
      <ellipse cx="8" cy="7" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="12" cy="6" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="16" cy="7" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="6.5" cy="9.5" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="10.5" cy="9" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="14.5" cy="9" rx="0.8" ry="1.2" fill="black" />
      <ellipse cx="18" cy="9.5" rx="0.8" ry="1.2" fill="black" />
    </svg>
  )
}
