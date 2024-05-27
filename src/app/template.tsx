"use client"

import { useEffect } from "react"

export interface RootTemplateProps {
  children: React.ReactNode
}

export default function RootTemplate({ children }: RootTemplateProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <>{children}</>
}
