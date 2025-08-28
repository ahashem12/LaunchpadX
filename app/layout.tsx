import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeWrapper } from "@/components/theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LPX - AI-Powered Project Management",
  description: "Simplify your project management with LPX, an AI-powered consultant for your projects.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeWrapper>
          {children}
          <Toaster />
        </ThemeWrapper>
      </body>
    </html>
  )
}
