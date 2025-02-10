"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      console.log("[PWA Debug] Service Worker is supported")
      
      // Check if there's an existing service worker
      if (navigator.serviceWorker.controller) {
        console.log("[PWA Debug] Active service worker found")
      }

      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log("[PWA Debug] Service Worker registered successfully:", {
            scope: registration.scope,
            active: !!registration.active,
            installing: !!registration.installing,
            waiting: !!registration.waiting
          })

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            console.log("[PWA Debug] Service Worker update found:", { newWorker })
          })
        })
        .catch((error) => {
          console.error("[PWA Debug] Service Worker registration failed:", error)
        })

      // Listen for controllerchange
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log("[PWA Debug] Service Worker controller changed")
      })

      // Listen for messages from the service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log("[PWA Debug] Message from Service Worker:", event.data)
      })
    } else {
      console.log("[PWA Debug] Service Worker is not supported")
    }
  }, [])

  return null
}
