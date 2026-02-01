// Atualizei a versão para v1.6 para garantir que ele pegue o CSS novo
const CACHE_NAME = "planner-2026-v1.6"; 

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
  // Se tiver imagens ou ícones, adicione aqui (ex: "./icon.png")
];

// 1. INSTALAÇÃO
self.addEventListener("install", (event) => {
  // Força o SW a assumir o controle imediatamente
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Cache criado com sucesso");
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
// Mostra o cache rápido, mas atualiza em segundo plano para a próxima vez
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {
        // Se estiver offline e não tiver cache, não quebra
      });

      return cachedResponse || fetchPromise;
    })
  );
});






