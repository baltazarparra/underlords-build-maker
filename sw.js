var CACHE_NAME = 'static-v2';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        'index.html',
        'main.js',
        'style.css',
        'img/Assassin.png',
        'img/bg.jpg',
        'img/BloodBound.png',
        'img/Brawny.png',
        'img/Deadeye.png',
        'img/Demon.png',
        'img/DemonHunter.png',
        'img/Dragon.png',
        'img/Druid.png',
        'img/Elusive.png',
        'img/Heartless.png',
        'img/Human.png',
        'img/Hunter.png',
        'img/Inventor.png',
        'img/Knight.png',
        'img/Mage.png',
        'img/Primordial.png',
        'img/Savage.png',
        'img/Scaled.png',
        'img/Scrappy.png',
        'img/Shaman.png',
        'img/Troll.png',
        'img/Warlock.png',
        'img/Warrior.png',
      ]);
    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});