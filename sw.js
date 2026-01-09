// Incremente a versão sempre que fizer alterações nos arquivos principais
const CACHE_NAME = "planner-pessoal-cache-v42";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css", // <-- ADICIONADO
  "./script.js", // <-- ADICIONADO
  "./icon-192x192.png",
  "./icon-512x512.png",
  // Adicione aqui outros arquivos importantes (CSS, JS) se tiver
];

// Evento de Instalação: Salva os arquivos e força a ativação.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
  // NOVIDADE: Força o novo Service Worker a se ativar imediatamente.
  self.skipWaiting();
});

// Evento de Ativação: Limpa os caches antigos (seu código aqui já estava perfeito).
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de Fetch: Estratégia "Stale-While-Revalidate" (a mais recomendada).
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna o cache imediatamente se existir
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Se a busca na rede funcionar, atualizamos o cache em segundo plano
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      // Retorna o que estiver no cache primeiro, enquanto a rede atualiza para a próxima visita.
      return cachedResponse || fetchPromise;
    })
  );
});







