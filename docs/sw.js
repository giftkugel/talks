self.addEventListener('install', (event) => console.log('ServiceWorker install', event));
self.addEventListener('activate', (event) => console.log('ServiceWorker activate', event));
self.addEventListener('message', (event) => console.log('ServiceWorker message', event));

self.addEventListener('push', (event) => {
    console.log('ServiceWorker push', event);
    const text = event.data.text();
    console.log('Text', text);

    const title = 'Push notification!';
    const options = {
        body: text
    };

    event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('sync', (event) => {
    if (event.tag === 'web-api-sync') {
        const title = 'Background Sync!';
        const options = {
            body: 'Back online!'
        };
        console.log('ServiceWorker my special sync', event);
        event.waitUntil(self.registration.showNotification(title, options));     
    } else {
        console.log('ServiceWorker sync', event)
    }
});

let CACHE = 'web-api-cache';

self.addEventListener('fetch', (event) => {
    //console.log('ServiceWorker fetch', event)

    event.respondWith(fromNetwork(event.request, 400).catch(() => {
        return fromCache(event.request);
    }));
});


function fromNetwork(request, timeout) {
    return new Promise((fulfill, reject) => {
        let timeoutId = setTimeout(reject, timeout);
        return caches.open(CACHE).then((cache) => {
            fetch(request).then((response) => {
                let clonedResponse = response.clone();
                clearTimeout(timeoutId);
                if (clonedResponse.url.includes(self.location.hostname)) {
                    cache.put(request, clonedResponse);
                    // console.log('fetched over network and updated cache', request.url);
                } else {
                    // console.log('fetched over network', request.url);
                }
                fulfill(response);
            }, reject);
        });
    });
}


function fromCache(request) {
    return caches.open(CACHE).then((cache) => {
        return cache.match(request).then((matching) => {
            // console.log('serve from cache', request.url;
            return matching || Promise.reject('cache-no-match');
        });
    });
}