const cacheName = 'nikkie-cbe-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/sw.js'
];

// Install event: caching files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(assetsToCache);
      })
  );
});

// Activate event: cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event: serve cached content if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
