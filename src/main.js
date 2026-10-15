// imports
// ------------------------------------------------------------------------
import { mount } from 'svelte';
// the global styles, imported before the app so the components styles
// come after them, they are minified and merged into a single CSS file
import './global.css';
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