"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, DownloadIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useIsInstalledPWA } from "@/hooks/useIsInstalledPWA"

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isInstalledPWA = useIsInstalledPWA()

  return (
    <nav className="flex justify-between items-center mb-4">
      <div className="space-x-4">
        <Link href="/">
          <Button variant={pathname === "/" ? "default" : "outline"}>Current</Button>
        </Link>
        <Link href="/archived">
          <Button variant={pathname === "/archived" ? "default" : "outline"}>Archived</Button>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {isInstalledPWA && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">PWA Installed</span>
        )}
        {!isInstalledPWA && (
          <Button variant="outline" size="icon" title="Install PWA">
            <DownloadIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        )}
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </nav>
  )
}

