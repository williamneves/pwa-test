import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt"
import type React from "react"
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration"

const inter = Inter({ subsets: ["latin"] })

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  userScalable: false
}

export const metadata: Metadata = {
  title: "Todo List PWA",
  description: "A simple todo list Progressive Web App",
  manifest: "/manifest.json",
  themeColor: "#000000",
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Todo List",
  },
  formatDetection: {
    telephone: false,
  },
  // Adding iOS meta tags as custom properties
  other: {
    "mobile-web-app-capable": "yes",
  } as Record<string, string>,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <PWAInstallPrompt />
          <ServiceWorkerRegistration />
        </ThemeProvider>
      </body>
    </html>
  )
}
