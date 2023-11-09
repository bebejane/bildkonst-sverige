'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export type LayoutProps = {
  children: React.ReactNode
}

export default function MainTemplate({ children }: LayoutProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.backgroundColor = pathname.startsWith('/medlem') ? 'var(--member-color)' : 'var(--background)'
  }, [pathname])

  return <>{children}</>
}