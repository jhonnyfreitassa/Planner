// Nova versão do cache para forçar a atualização
const CACHE_NAME = 'planner-pessoal-cache-v2'; 
const urlsToCache = [
  './',
  './index.html',
  './icon-192x192.png',
  './icon-512x512.png'
];

// Evento de Instalação: Salva os arquivos essenciais no novo cache.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Ativação: Limpa os caches antigos.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Se o cache não for o atual, ele será deletado
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de Fetch: Responde com o cache, mas tenta atualizar em segundo plano.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna a resposta do cache
        if (response) {
          return response;
        }
        // Senão, faz a requisição à rede
        return fetch(event.request);
      }
    )
  );
});

