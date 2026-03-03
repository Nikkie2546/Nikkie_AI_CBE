// ================= SERVICE WORKER =================
const CACHE_NAME = "nikkie-ai-cbe-v1";
const ASSETS_TO_CACHE = [
  "/", // index.html
  "/index.html",
  "/style.css",
  "/script.js",
  "/sw.js"
];

// Install event: caching all assets
self.addEventListener("install", event => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event: clean old caches if needed
self.addEventListener("activate", event => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event: serve cached assets if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if(cachedResponse) return cachedResponse;
      return fetch(event.request).catch(() => {
        // Optional: fallback if not cached and offline
        if(event.request.destination === "document") return caches.match("/index.html");
      });
    })
  );
});
