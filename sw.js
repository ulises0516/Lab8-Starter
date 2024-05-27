
const CACHE_NAME = 'lab-8-starter';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      const RECIPE_URLS = [
        'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
        'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
        'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
        'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
        'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
        'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
      ];
      
      return cache.addAll(RECIPE_URLS);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);

      const cachedR = await cache.match(event.request);
      if (cachedR) {
        return cachedR;
      }

      const networkR = await fetch(event.request);

      if (networkR && networkR.status === 200 && networkR.type === 'basic') {
        cache.put(event.request, networkR.clone());
      }

      return networkR;
    } catch (error) {
      console.error('FAILEDEEEE!!!!', error);
      throw error;
    }
  })());
});
