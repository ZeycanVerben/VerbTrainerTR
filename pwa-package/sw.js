// ============================================================
// SERVICE WORKER — Almanca Fiil Çalışma PWA
// Versiyon numarasını her güncelleme sonrası artır
// ============================================================
const CACHE_NAME = 'almanca-fiil-v1';

// Uygulama başlarken önbelleğe alınacak dosyalar
const PRECACHE_URLS = [
  '/index.html',
  '/verbs.json',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Google Fonts offline çalışmaz ama uygulama yine de açılır
];

// ── Kurulum: temel dosyaları önbelleğe al ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Aktivasyon: eski cache'leri temizle ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: önce cache, sonra network ──
self.addEventListener('fetch', event => {
  // Sadece GET isteklerini yakala
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ses dosyaları: network first, sonra cache (büyük dosyalar)
  if (url.pathname.startsWith('/audio/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        fetch(event.request)
          .then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request))
      )
    );
    return;
  }

  // Diğer her şey: cache first, yoksa network'ten al ve cache'e ekle
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || !response.ok) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});

// ── Güncelleme mesajı ──
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
