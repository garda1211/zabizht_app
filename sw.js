const CACHE_NAME = "zabizht-app-v3";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json"
];

// установка
self.addEventListener("install", event => {
  console.log("Service Worker установлен");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// запросы
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// обновление
self.addEventListener("activate", event => {
  console.log("Service Worker активирован");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});