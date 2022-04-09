// the cache name that will invalidate the cached files when changed (string)
// ------------------------------------------------------------------------
const cacheName = 'pushups-v4.7';


// basic list of files that require caching (array)
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
	'/audio/final.mp3',
	'/pushups.webmanifest',
	'https://use.typekit.net/af/28f000/00000000000000003b9b2048/27/l?primer=e6066692ab328d1a92bb155659ed6609b693e1e352f0e8982e4224719b13bdfb&fvd=n5&v=3',
	'https://use.typekit.net/af/8a200c/00000000000000003b9b204a/27/l?primer=e6066692ab328d1a92bb155659ed6609b693e1e352f0e8982e4224719b13bdfb&fvd=n6&v=3',
	'https://use.typekit.net/af/d3af1d/00000000000000003b9b0ef9/27/l?primer=592708b04bace7901bbf402b49fc07acf6f622abacda535ca47331b6917becfb&fvd=n7&v=3',
	'https://use.typekit.net/af/bbab84/00000000000000003b9b0ef7/27/l?primer=592708b04bace7901bbf402b49fc07acf6f622abacda535ca47331b6917becfb&fvd=n6&v=3'
];


// list of files that should be updated as soon as possible
// ------------------------------------------------------------------------
const refreshFiles = [
	'/data/news.json'
];



// purpose:		checks if given string ends with any of the strings in array
// arguments:	suffixes to check (array), string to do the check on (string)
// returns:		if given string ends with any of the strings in array (bool)
// ------------------------------------------------------------------------
function endsWithAny(suffixes, string) {
	return suffixes.some(function (suffix) {
		return string.endsWith(suffix);
	});
}



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

		// for files that should not be updated as soon as possible, return them from cache
		const cached = await caches.match(event.request);
		if(cached){
			if(!endsWithAny(refreshFiles, event.request.url)){
				return cached;
			}
		}

		// if the files are not cached, get the from the server
		return fetch(event.request)
			.then((response) => {
				caches.open(cacheName).then(cache => {
					cache.put(event.request, response.clone());
				});
			})
			.catch(() => { return new Response('', { "status": 500, "statusText": 'Offline' }); });

	})());
});
