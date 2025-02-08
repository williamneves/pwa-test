"use client"

import { useIsInstalledPWA } from "@/hooks/useIsInstalledPWA"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "@radix-ui/react-icons"

export function PWAInstallPrompt() {
  const isInstalledPWA = useIsInstalledPWA()

  if (isInstalledPWA) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg flex justify-between items-center">
      <div>
        <h3 className="font-bold">Install Our App</h3>
        <p className="text-sm">Add to your home screen for easy access</p>
      </div>
      <Button variant="secondary" className="flex items-center gap-2">
        <DownloadIcon /> Install
      </Button>
    </div>
  )
}

