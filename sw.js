const CACHE_NAME = "xerxise-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/favicon.svg",
  "/firebase-config.js",
];

// Install: cache core assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Handle notification messages from the app
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(e.data.title, {
      body: e.data.body,
      icon: "./favicon.svg",
      tag: e.data.tag || "xerxise-alert",
      requireInteraction: true,
      vibrate: [200, 100, 200],
    });
  }
});

// Click notification → focus the app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes("xerxise") || client.url.includes("mybody")) {
          return client.focus();
        }
      }
      return self.clients.openWindow("/");
    })
  );
});
