"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "./header/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { Footer } from "./Footer"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar stays fixed */}
      <div className="sticky top-0 h-screen">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Right side: header + content + footer */}
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />

        <main className="flex-1 p-6">{children}</main>

        <Footer />
      </div>
    </div>
  )
}
