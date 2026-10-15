import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';


// purpose:		tells if the built file is cached by the service worker, the app
//				is not installed for offline use when any of them fails to load
// arguments:	the file path relative to the build directory (string)
// returns:		if the file should be cached (bool)
// ------------------------------------------------------------------------
function isCached(file){
	return file === 'index.html'
		|| file === 'pushups.webmanifest'
		|| (file.startsWith('assets/') && !file.endsWith('.map'))
		|| file.startsWith('audio/')
		|| file.startsWith('img/favicon-');
};


// purpose:		puts the version of the build and the list of the built files
//				into the service worker, so the users get the new files after
//				every deploy that changed them
// returns:		the Vite plugin replacing __BUILD_VERSION__ in service-worker.js
//				with a hash of all the other built files and the
//				__CACHE_FILES__ comment with the files to cache
// ------------------------------------------------------------------------
function serviceWorkerVersion(){
	let outDir;

	return {
		name: 'service-worker-version',
		apply: 'build',

		configResolved(config){
			outDir = path.resolve(config.root, config.build.outDir);
		},

		closeBundle(){
			let worker = path.join(outDir, 'service-worker.js');
			let hash = createHash('sha256');

			let files = fs.readdirSync(outDir, { recursive: true })
				.map((file) => file.split(path.sep).join('/'))
				.filter((file) => file !== 'service-worker.js' && !file.endsWith('.map'))
				.filter((file) => fs.statSync(path.join(outDir, file)).isFile())
				.sort();

			for(let file of files){
				hash.update(file).update(fs.readFileSync(path.join(outDir, file)));
			}

			let content = fs.readFileSync(worker, 'utf8');

			for(let placeholder of ['__BUILD_VERSION__', '/* __CACHE_FILES__ */']){
				if(!content.includes(placeholder)){
					throw new Error(`service-worker.js is missing the ${placeholder} placeholder`);
				}
			}

			let cacheFiles = files.filter(isCached).map((file) => `'/${file}'`).join(',\n\t');

			fs.writeFileSync(worker, content
				.replaceAll('__BUILD_VERSION__', hash.digest('hex').slice(0, 12))
				.replace('/* __CACHE_FILES__ */', cacheFiles)
			);
		}
	};
};


export default defineConfig({
	plugins: [
		// the Svelte options are in svelte.config.mjs
		svelte(),
		serviceWorkerVersion()
	],

	// the same port for dev and preview, Cypress expects the app there
	server: {
		port: 8080,
		host: true
	},
	preview: {
		port: 8080,
		host: true
	},

	// the built files get a hash in their names (assets/index-[hash].js),
	// so they are cached for a year (see vercel.json) and the service worker
	// gets their names on every build
	build: {
		sourcemap: true
	}
});
