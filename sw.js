const CACHE_NAME = "planner-pessoal-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  // Se você tiver ícones, adicione-os aqui também
  "/icon-192x192.png",
  "/icon-512x512.png",
  // Adicione aqui outros arquivos estáticos se houver (CSS, JS externos)
];

// Evento de Instalação: Salva os arquivos essenciais no cache.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de Fetch: Intercepta as solicitações de rede.
// Responde com o cache se disponível, senão, busca na rede.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se encontrar no cache, retorna a resposta do cache
      if (response) {
        return response;
      }
      // Senão, faz a requisição à rede
      return fetch(event.request);
    })
  );
});
