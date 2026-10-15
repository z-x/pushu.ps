// the cache name that will invalidate the cached files when changed (string)
// the version placeholder is replaced on every build with a hash of the built files
// (see vite.config.mjs), so returning users get the files of a new deploy
// ------------------------------------------------------------------------
const cacheName = 'pushups-__BUILD_VERSION__';


// basic list of files that require caching, the app is not installed for
// offline use when any of them fails to load, the built files are added
// on every build (see isCached() in vite.config.mjs) (array)
// ------------------------------------------------------------------------
const cacheFiles = [
	'/',
	/* __CACHE_FILES__ */
];


// the built files with a hash in their names, they never change, so they
// can be taken from the browser cache that already has them (string)
// ------------------------------------------------------------------------
const hashedFiles = '/assets/';


// the fonts, cached when possible, but the app is installed without them when
// they fail to load, so a changed font address would not stop the app updates
// (the same addresses are in global.css and index.html) (array)
// ------------------------------------------------------------------------
const fontFiles = [
	'https://use.typekit.net/af/28f000/00000000000000003b9b2048/27/l?primer=e6066692ab328d1a92bb155659ed6609b693e1e352f0e8982e4224719b13bdfb&fvd=n5&v=3',
	'https://use.typekit.net/af/8a200c/00000000000000003b9b204a/27/l?primer=e6066692ab328d1a92bb155659ed6609b693e1e352f0e8982e4224719b13bdfb&fvd=n6&v=3',
	'https://use.typekit.net/af/d3af1d/00000000000000003b9b0ef9/27/l?primer=592708b04bace7901bbf402b49fc07acf6f622abacda535ca47331b6917becfb&fvd=n7&v=3',
	'https://use.typekit.net/af/bbab84/00000000000000003b9b0ef7/27/l?primer=592708b04bace7901bbf402b49fc07acf6f622abacda535ca47331b6917becfb&fvd=n6&v=3'
];


// the news, always taken from the internet and never cached, as it is useful
// only when connected, when offline an empty list is returned so no news is shown
// ------------------------------------------------------------------------
const newsFile = '/data/news.json';



// what will happen after the service worker installs
// ------------------------------------------------------------------------
self.addEventListener('install', (event) => {

	// load requested files into cache, skipping the browser cache for the files
	// without a hash, so the new cache would not get the files of the previous
	// version, the hashed ones are not downloaded again after the page loaded them
	event.waitUntil((async() => {
		const cache = await caches.open(cacheName);
		await cache.addAll(cacheFiles.map((file) => new Request(file, { cache: file.startsWith(hashedFiles) ? 'default' : 'reload' })));

		// the fonts one by one, a font that fails to load is just skipped
		await Promise.all(fontFiles.map((file) => cache.add(file).catch(() => {})));
	})());

	// use the new version right away instead of waiting for all the app
	// windows to be closed, the new files are used on the next app launch
	self.skipWaiting();

});


// what will happen when the new version of the service worker takes over
// ------------------------------------------------------------------------
self.addEventListener('activate', (event) => {

	// remove the files cached by the previous versions
	event.waitUntil((async() => {
		const cacheNames = await caches.keys();

		await Promise.all(cacheNames
			.filter((name) => name !== cacheName)
			.map((name) => caches.delete(name))
		);

		await self.clients.claim();
	})());

});


// return the content of the specific file from cache if no network available
// ------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	// the news only from the internet, an empty news list when offline
	if(url.origin === self.location.origin && url.pathname === newsFile){
		event.respondWith(
			fetch(event.request.url, { cache: 'no-cache' })
				.catch(() => new Response('[]', { headers: { 'Content-Type': 'application/json' } }))
		);
		return;
	}

	// the app pages are the same single page, so the address
	// (e.g. with ?utm_source=) does not matter for finding it in the cache
	const isPage = event.request.mode === 'navigate';

	event.respondWith((async () => {

		// return the files from cache
		const cached = await caches.match(event.request, { ignoreSearch: isPage });
		if(cached){
			return cached;
		}

		// if the files are not cached, get them from the server
		try {
			return await fetch(event.request);
		}
		catch(error){
			// an app page that was not cached under its address, e.g. opened
			// from a link, still opens the app when offline
			if(isPage){
				const app = await caches.match('/index.html');
				if(app){ return app; }
			}

			return new Response('', { "status": 500, "statusText": 'Offline' });
		}

	})());
});
