import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';


// purpose:		puts the version of the build into the service worker cache name,
//				so the users get the new files after every deploy that changed them
// returns:		the Vite plugin replacing __BUILD_VERSION__ in service-worker.js
//				with a hash of all the other built files
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

			if(!content.includes('__BUILD_VERSION__')){
				throw new Error('service-worker.js is missing the __BUILD_VERSION__ placeholder');
			}

			fs.writeFileSync(worker, content.replaceAll('__BUILD_VERSION__', hash.digest('hex').slice(0, 12)));
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

	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				// keep the file names stable as service-worker.js caches them
				entryFileNames: 'build/bundle.js',
				chunkFileNames: 'build/[name].js',
				assetFileNames: (asset) => asset.names.some((name) => name.endsWith('.css')) ? 'build/bundle.css' : 'build/[name][extname]'
			}
		}
	}
});
