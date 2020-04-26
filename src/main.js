// set defaults
// ------------------------------------------------------------------------
localStorage.lastActive = Date.now();


// imports
// ------------------------------------------------------------------------
import App from './App.svelte';


// create the app
// ------------------------------------------------------------------------
const app = new App({
	target: document.body,
	intro: true
});


// exports
// ------------------------------------------------------------------------
export default app;