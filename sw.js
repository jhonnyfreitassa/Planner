// Versão 2.1 
const CACHE_NAME = "planner-2026-v2.2"; 

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  // NOMES EXATOS QUE VOCÊ SALVOU NA PASTA:
  "./icon-192x192.png",
  "./icon-512x512.png"
];

// 1. INSTALAÇÃO
self.addEventListener("install", (event) => {
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Cache v2.0 criado com sucesso");
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. ATIVAÇÃO (Limpa caches velhos)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[ServiceWorker] Apagando cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. FETCH (Estratégia: Stale-While-Revalidate)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});


