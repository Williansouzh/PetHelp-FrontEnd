import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ajuda e Recursos - PetHelp",
  description: "Recursos, guias e assistência para cuidados com animais",
}

export default function AjudaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
