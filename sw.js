self.options = {
    "domain": "5gvci.com",
    "zoneId": 10709207
}
self.lary = ""
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')


// --- Baki Ads ka code upar rehne do ---
self.options = { "domain": "5gvci.com", "zoneId": 10709207 };
self.lary = "";
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw');

// --- Ye naya PWA logic niche add kar do ---
const CACHE_NAME = 'visualixy-v2';
const assets = ['/', '/index.html', '/style.css', '/script.js', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});