// the cache name that will invalidate the cached files when changed (string)
// ------------------------------------------------------------------------
const cacheName = 'pushups-v4.7';


// list of files that require caching (array)
// ------------------------------------------------------------------------
const cacheFiles = [
	'/',
	'/index.html',
	'/build/bundle.js',
	'/global.css',
	'/build/bundle.css',
	'/img/favicon-32.png',
	'/img/favicon-128.png',
	'/img/favicon-152.png',
	'/img/favicon-167.png',
	'/img/favicon-180.png',
	'/img/favicon-192.png',
	'/img/favicon-196.png',
	'/audio/alert.mp3',
	'/audio/final.mp3'
];



// what will happen after the service worker installs
// ------------------------------------------------------------------------
self.addEventListener('install', (event) => {

	// load requested files into cache
	event.waitUntil((async() => {
		const cache = await caches.open(cacheName);
		await cache.addAll(cacheFiles);
	})());

});


// return the content of the specific file from cache if no network available
// ------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
	event.respondWith((async () => {

		// check if the file is in cache and return it if so
		const request = await caches.match(event.request);
		if(request){ return request; }

		// if not, get it from the server
		const response = await fetch(event.request);
		// and cache it
		const cache = await caches.open(cacheName);
		cache.put(event.request, response.clone());

		return response;
	})());
});
