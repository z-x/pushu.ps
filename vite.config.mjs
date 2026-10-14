import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';


export default defineConfig({
	plugins: [
		// the Svelte options are in svelte.config.mjs
		svelte()
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
