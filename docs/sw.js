self.addEventListener('install', (event) => console.log('ServiceWorker install', event));
self.addEventListener('activate', (event) => console.log('ServiceWorker activate', event));
self.addEventListener('message', (event) => console.log('ServiceWorker message', event));

//self.addEventListener('fetch', (event) => console.log('ServiceWorker fetch', event));
self.addEventListener('sync', (event) => console.log('ServiceWorker sync', event));
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