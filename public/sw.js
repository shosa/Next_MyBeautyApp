
self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    event.waitUntil(
        caches.open('mybeautyapp-v1')
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/clientsList',
                    '/services',
                    '/calendar',
                    '/info',
                    '/favicon.ico',
                    '/globals.css',
                    '/layout.tsx',
                    '/page.tsx',
                    '/app/clientsList/page.tsx',
                    '/components/Navbar.tsx'
                ]);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
