const CACHE = 'savings-calc-v2';
const FILES = ['/', '/index.html', '/glossary.html', '/about.html', '/privacy.html', '/disclaimer.html', '/contact.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
