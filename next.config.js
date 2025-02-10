import withPWA from "next-pwa"

const nextConfig = {
}

export default withPWA({
  ...nextConfig,
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in development mode
  // runtimeCaching: [
  //   {
  //     urlPattern: /^https?.*/,
  //     handler: "NetworkFirst",
  //     options: {
  //       cacheName: "offlineCache",
  //       expiration: {
  //         maxEntries: 200,
  //         maxAgeSeconds: 24 * 60 * 60 // 24 hours
  //       },
  //     }
  //   },
  //   {
  //     urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
  //     handler: "CacheFirst",
  //     options: {
  //       cacheName: "imageCache",
  //       expiration: {
  //         maxEntries: 50,
  //         maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  //       },
  //     }
  //   }
  // ],
  buildExcludes: [/middleware-manifest\.json$/],
  modifyURLPrefix: {
    // Add any URL prefix modifications if needed
  }
})
