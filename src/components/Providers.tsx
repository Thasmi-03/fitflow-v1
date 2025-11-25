// src/components/Providers.tsx
"use client"

import React from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "sonner"
import Navbar from "@/components/ui/navbar"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      {/* Toaster placed here so any page/component can call toast */}
      <Toaster />
      {children}
    </AuthProvider>
  )
}
