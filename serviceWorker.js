importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox is loaded 🎉`);
  workbox.precaching.precacheAndRoute(
    [
      { url: "/index.html", revision: "2" },
      { url: "/nav.html", revision: "1" },
      { url: "/teamsInfo.html", revision: "1" },
      { url: "/favicon.ico", revision: "1" },
      { url: "/manifest.json", revision: "1" },
      { url: "/css/materialize.min.css", revision: "1" },
      { url: "/css/style.css", revision: "2" },
      { url: "/js/materialize.min.js", revision: "1" },
      { url: "/js/nav.js", revision: "1" },
      { url: "/js/data.js", revision: "1" },
      { url: "/js/script.js", revision: "1" },
      { url: "/js/db.js", revision: "1" },
      { url: "/js/idb.js", revision: "1" },
      { url: "/js/btnClickListener.js", revision: "1" },
      { url: "/pages/match.html", revision: "1" },
      { url: "/pages/standings.html", revision: "1" },
      { url: "/pages/teams.html", revision: "1" },
      { url: "/pages/saved.html", revision: "1" },
      { url: "/images/icons/icon-72x50.png", revision: "1" },
      { url: "/images/icons/icon-72x72.png", revision: "1" },
      { url: "/images/icons/icon-96x67.png", revision: "1" },
      { url: "/images/icons/icon-96x96.png", revision: "1" },
      { url: "/images/icons/icon-128x90.png", revision: "1" },
      { url: "/images/icons/icon-128x128.png", revision: "1" },
      { url: "/images/icons/icon-144x101.png", revision: "1" },
      { url: "/images/icons/icon-144x144.png", revision: "1" },
      { url: "/images/icons/icon-152x107.png", revision: "1" },
      { url: "/images/icons/icon-152x152.png", revision: "1" },
      { url: "/images/icons/icon-192x135.png", revision: "1" },
      { url: "/images/icons/icon-192x192.png", revision: "1" },
      { url: "/images/icons/icon-384x271.png", revision: "1" },
      { url: "/images/icons/icon-384x384.png", revision: "1" },
      { url: "/images/icons/icon-512x362.png", revision: "1" },
      { url: "/images/icons/icon-512x512.png", revision: "1" },
    ],
    {
      ignoreUrlParametersMatching: [/.*/],
    }
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "image",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.cacheFirst({
      cacheName: "google-fonts",
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js)$/,
    workbox.strategies.cacheFirst({
      cacheName: "js",
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages-list",
    })
  );
} else {
  console.log(`Workbox didn't load 😬`);
}

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  let options = {
    body: body,
    icon: "images/icons/icon-72x50.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
