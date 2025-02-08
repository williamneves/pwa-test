self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/todos")) {
    event.respondWith(
      caches.open("todos-cache").then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone())
            return response
          })
          .catch(() => {
            return cache.match(event.request)
          })
      }),
    )
  }
})

