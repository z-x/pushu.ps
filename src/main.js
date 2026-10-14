// set defaults
// ------------------------------------------------------------------------
localStorage.lastActive = Date.now();


// imports
// ------------------------------------------------------------------------
import { mount } from 'svelte';
import App from './App.svelte';


// create the app
// ------------------------------------------------------------------------
const app = mount(App, {
	target: document.body,
	intro: true
});


// exports
// ------------------------------------------------------------------------
export default app;