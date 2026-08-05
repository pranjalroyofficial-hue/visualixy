const CACHE_NAME = 'visualixy-static-v1';
const OFFLINE_URL = '/';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://unpkg.com/pdf-lib/dist/pdf-lib.min.js',
  'https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/compressorjs/1.1.1/compressor.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS.map(url => new Request(url, {mode: 'no-cors'}))).catch(()=>{
        // best-effort: try caching same-origin assets
        return cache.addAll(['/','/index.html','/manifest.json']).catch(()=>{});
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Always try cache-first for our origin
  if(url.origin === self.location.origin){
    event.respondWith(caches.match(event.request).then(resp=>resp || fetch(event.request).then(r=>{ const copy=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request, copy)); return r; }).catch(()=>caches.match('/'))));
    return;
  }
  // For cross-origin (CDN) use network-first with cache fallback
  event.respondWith(fetch(event.request).then(resp=>{
    const copy = resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request, copy)); return resp;
  }).catch(()=>caches.match(event.request)));
});

self.addEventListener('message', (event) => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
