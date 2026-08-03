// Cambia este número cada vez que publiques una versión nueva
const CACHE = 'tailandia-2026-v3';
const CORE = ['index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // NETWORK-FIRST para el documento (HTML): siempre intenta traer la ultima version.
  const isDoc = request.mode === 'navigate' ||
                request.destination === 'document' ||
                url.pathname.endsWith('/') ||
                url.pathname.endsWith('index.html');
  if (isDoc) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('index.html', copy));
          return res;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // CACHE-FIRST para el resto (iconos, imagenes de Wikimedia).
  e.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        try {
          if (url.hostname.includes('wikimedia.org') || url.hostname.includes('wikipedia.org')) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
        } catch (err) {}
        return res;
      }).catch(() => cached);
    })
  );
});
