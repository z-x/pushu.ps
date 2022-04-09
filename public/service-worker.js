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



self.addEventListener('install', (event) => {

	// load requested files into cache
	event.waitUntil((async() => {
		const cache = await caches.open(cacheName);
		await cache.addAll(cacheFiles);
	})());

});
