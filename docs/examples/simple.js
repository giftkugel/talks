console.log(this);
console.log(self);

self.addEventListener('install', (event) => {
    console.log('install', event);

    event.waitUntil(
        self.caches.open('static')
        .then(cache => cache.addAll([
            'simple.html',
            'image.gif',
            '/'
        ])).then(() => self.skipWaiting())
    );
    
});

self.addEventListener('activate', (event) => {
    console.log('activate', event);
});

// fetching a resource
self.addEventListener('fetch', (event) => {
    console.log('fetch', event);

    event.respondWith(
        self.caches.match(event.request)
        .then((response) => {
            if (response) {
                console.log('cached reponse', event);
                return response;
            }

            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then((response) => {
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
    
                const responseToCache = response.clone();
    
                self.caches.open('onthefly')
                .then((cache) => cache.put(event.request, responseToCache));
    
                return response;
            });
        })
    );
});

// postMessage
self.addEventListener('message', (event) => {
    console.log('message', event);
});

// server push
self.addEventListener('push', (event) => {
    console.log('push', event);
});

self.addEventListener('pushsubscriptionchange', (event) => {
    console.log('pushsubscriptionchange', event);
});

// notifications click
self.addEventListener('notificationclick', (event) => {
    console.log('notificationclick', event);
});

// notifications close
self.addEventListener('onnotificationclose', (event) => {
    console.log('onnotificationclose', event);
});

// background sync
self.addEventListener('sync', (event) => {
    console.log('sync', event);
});

console.log('clients', self.clients);
console.log('registration', self.registration);
console.log('caches', self.caches);