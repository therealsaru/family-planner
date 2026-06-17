// Service worker — PWA install support only, no caching
// This ensures updates deploy instantly without users needing to clear cache

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Clear ALL old caches immediately
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Never cache — always go to network
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
