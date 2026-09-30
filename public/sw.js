const CACHE_NAME = 'biblioteca-v1';
const ARCHIVOS_A_GUARDAR = [
  '/',
  '/manifest.json',
  '/offline'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_A_GUARDAR))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: activado');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuestaEnCache) => {
      return respuestaEnCache || fetch(event.request).catch(() => {
        // Opción A: Mostrar página de fallback si es una petición de navegación (página web)
        if (event.request.mode === 'navigate') {
          return caches.match('/offline');
        }
      });
    })
  );
});
