const CACHE_NAME = "firstpwa-v2";
var urlsToCache = [
  "/FirstPWA",
  "/FirstPWA/index.html",
  "/FirstPWA/pages/header.html",
  "/FirstPWA/pages/about.html",
  "/FirstPWA/pages/skill.html",
  "/FirstPWA/nav.html",
  "/FirstPWA/pages/contact.html",
  "/FirstPWA/css/materialize.min.css",
  "/FirstPWA/js/materialize.min.js",
  "/FirstPWA/js/nav.js"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
          
          if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
          return;
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

self.addEventListener("activate",function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker: cache "+cacheName+" dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
