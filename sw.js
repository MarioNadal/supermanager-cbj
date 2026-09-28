// SuperManager CBJ — Service Worker: app shell en caché, datos siempre en red (Firebase).
const CACHE_VERSION = "smcbj-0.1.0";
const SHELL = ["./", "index.html", "manifest.json", "assets/logo.svg", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // Firebase, fuentes, etc. → red directa
  // Red primero (para recibir versiones nuevas), caché si no hay conexión.
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE_VERSION).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
