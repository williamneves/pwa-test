"use client"

import { useState, useEffect } from "react"

export function useIsInstalledPWA() {
  const [isInstalledPWA, setIsInstalledPWA] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)")

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsInstalledPWA(e.matches || (navigator as any).standalone === true)
    }

    // Check on mount
    handleChange(mediaQuery)

    // Listen for changes
    mediaQuery.addListener(handleChange)

    return () => mediaQuery.removeListener(handleChange)
  }, [])

  return isInstalledPWA
}

