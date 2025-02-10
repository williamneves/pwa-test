"use client"

import { useState, useEffect } from "react"
import { useIsInstalledPWA } from "@/hooks/useIsInstalledPWA"
import { Button } from "@/components/ui/button"
import { DownloadIcon, Cross2Icon } from "@radix-ui/react-icons"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface BrowserInfo {
  isIOS: boolean;
  isFirefox: boolean;
  isChrome: boolean;
  isSamsung: boolean;
}

export function PWAInstallPrompt() {
  const isInstalledPWA = useIsInstalledPWA()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    isIOS: false,
    isFirefox: false,
    isChrome: false,
    isSamsung: false
  })

  useEffect(() => {
    // Check if user has previously dismissed the prompt
    const hasUserDismissed = localStorage.getItem('pwa-prompt-dismissed')
    if (hasUserDismissed) {
      setIsDismissed(true)
      return
    }

    const detectBrowser = () => {
      const ua = navigator.userAgent.toLowerCase()
      const isIOS = /iphone|ipad|ipod/.test(ua)
      const isFirefox = ua.includes('firefox')
      const isChrome = ua.includes('chrome') || ua.includes('crios')
      const isSamsung = ua.includes('samsungbrowser')

      setBrowserInfo({
        isIOS,
        isFirefox,
        isChrome,
        isSamsung
      })
    }

    detectBrowser()

    const beforeInstallHandler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler as EventListener)
    
    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
      setIsDismissed(true)
      localStorage.setItem('pwa-prompt-dismissed', 'true')
    })

    return () => window.removeEventListener('beforeinstallprompt', beforeInstallHandler as EventListener)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log("User response to the install prompt:", outcome)
    setDeferredPrompt(null)
    if (outcome === 'accepted') {
      setIsDismissed(true)
      localStorage.setItem('pwa-prompt-dismissed', 'true')
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  // Don't show if app is installed, dismissed, or no installation prompt available
  if (isInstalledPWA || isDismissed) return null

  const PromptWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
      <div className="relative">
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-6 w-6"
        >
          <Cross2Icon className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>
  )

  // iOS Devices (both Safari and Chrome)
  if (browserInfo.isIOS) {
    return (
      <PromptWrapper>
        <div className="space-y-2 pr-8">
          <h3 className="font-bold text-lg">Install Our App</h3>
          <p className="text-sm">To install this app on your iPhone:</p>
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li>Tap the Share button <span className="inline-block">📤</span></li>
            <li>Scroll and tap &quot;Add to Home Screen&quot; <span className="inline-block">🏠</span></li>
            <li>Tap &quot;Add&quot; to install</li>
          </ol>
        </div>
      </PromptWrapper>
    )
  }

  // Samsung Browser
  if (browserInfo.isSamsung) {
    return (
      <PromptWrapper>
        <div className="space-y-2 pr-8">
          <h3 className="font-bold text-lg">Install Our App</h3>
          <p className="text-sm">To install:</p>
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li>Tap the menu button (⋮)</li>
            <li>Select &quot;Add page to&quot;</li>
            <li>Tap &quot;Home screen&quot;</li>
          </ol>
        </div>
      </PromptWrapper>
    )
  }

  // Standard install prompt (Chrome on Android and other browsers)
  if (deferredPrompt) {
    return (
      <PromptWrapper>
        <div className="flex justify-between items-center pr-8">
          <div className="space-y-1">
            <h3 className="font-bold text-lg">Install Our App</h3>
            <p className="text-sm">Add to your home screen for the best experience</p>
          </div>
          <Button 
            onClick={handleInstallClick} 
            variant="secondary" 
            className="flex items-center gap-2 px-4 py-2"
          >
            <DownloadIcon className="w-5 h-5" /> 
            Install
          </Button>
        </div>
      </PromptWrapper>
    )
  }

  return null
}
