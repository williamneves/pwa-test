"use client"

import { useState, useEffect } from "react"

export function useIsInstalledPWA() {
  const [isInstalledPWA, setIsInstalledPWA] = useState(false)

  useEffect(() => {
    console.log("[PWA Debug] useIsInstalledPWA hook mounted")
    const mediaQuery = window.matchMedia("(display-mode: standalone)")

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const isStandalone = 'standalone' in navigator ? (navigator as { standalone?: boolean }).standalone : undefined
      const newIsInstalled = e.matches || isStandalone === true
      
      console.log("[PWA Debug] Installation status check:", {
        mediaQueryMatches: e.matches,
        navigatorStandalone: isStandalone,
        finalStatus: newIsInstalled
      })
      
      setIsInstalledPWA(newIsInstalled)
    }

    // Check on mount
    handleChange(mediaQuery)
    console.log("[PWA Debug] Initial installation check complete")

    // Listen for changes
    mediaQuery.addListener(handleChange)
    console.log("[PWA Debug] Added display-mode change listener")

    return () => {
      mediaQuery.removeListener(handleChange)
      console.log("[PWA Debug] Cleaned up display-mode listener")
    }
  }, [])

  return isInstalledPWA
}
