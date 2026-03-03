// ================== Service Worker ==================

// Cache version
const CACHE_NAME = 'nikkie-ai-cbe-v1';

// Files to cache
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/sw.js'
];

// ================== INSTALL EVENT ==================
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// ================== ACTIVATE EVENT ==================
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ================== FETCH EVENT ==================
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        // Fetch from network if not in cache
        return fetch(event.request)
          .then((res) => {
            return caches.open(CACHE_NAME).then((cache) => {
              // Cache the new response
              cache.put(event.request, res.clone());
              return res;
            });
          });
      }).catch(() => {
        // Optional fallback if offline
        return caches.match('/index.html');
      })
  );
});
