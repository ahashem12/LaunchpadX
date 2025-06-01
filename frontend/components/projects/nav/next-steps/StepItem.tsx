// components/projects/nav/next-steps/StepItem.tsx
"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepItemProps {
  done: boolean
  title: string
  isExpanded?: boolean
  onToggle?: () => void
  children?: React.ReactNode
}

export function StepItem({ done, title, isExpanded = false, onToggle, children }: StepItemProps) {
  return (
    <div
      className={cn(
        "mb-4 rounded-lg border",
        done ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500",
      )}
    >
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              done ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
            )}
          >
            {done ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </div>
          <div>
            <div className="text-xs uppercase font-medium text-gray-400">{done ? "DONE" : "TO DO"}</div>
            <div className="font-medium text-white">{title}</div>
          </div>
        </div>
        <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform", isExpanded && "rotate-180")} />
      </div>
      {isExpanded && children && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  )
}