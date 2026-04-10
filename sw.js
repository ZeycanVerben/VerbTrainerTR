const CACHE_NAME = 'almanca-fiil-v6';
const PRECACHE_URLS = [
  './index.html',
  './verbs.json',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/audio/') || url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        fetch(event.request).then(resp => {
          if (resp.ok) cache.put(event.request, resp.clone());
          return resp;
        }).catch(() => cache.match(event.request))
      )
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (!resp || !resp.ok) return resp;
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
        return resp;
      });
    })
  );
});
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
