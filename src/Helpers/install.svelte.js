/*
	Installing the app on the home screen, in browsers that support it
	(Chrome, Edge, Samsung Internet and others with the 'beforeinstallprompt' event).

	Usage: import install from './Helpers/install.svelte.js'; show the install
	button only when install.available is true and call install.prompt() when
	the user clicks it, browsers allow the install dialog only on user action.
*/



// purpose:		holds the install prompt offered by the browser
// ************************************************************************
class Install {

	// the install prompt saved from the browser, null when it was not offered
	#installPrompt = $state.raw(null);

	// if the app can be installed right now, false in browsers without the
	// support, when the app is already installed or was just installed (bool)
	available = $derived(this.#installPrompt !== null);


	// purpose:		listens for the browser offering to install the app
	// ------------------------------------------------------------------------
	constructor(){
		window.addEventListener('beforeinstallprompt', (event) => {
			// the app shows its own install buttons instead of the browser banner
			event.preventDefault();
			this.#installPrompt = event;
		});

		// installed from the app button or from the browser menu
		window.addEventListener('appinstalled', () => {
			this.#installPrompt = null;
		});
	};


	// purpose:		shows the browser install dialog
	// returns:		triggers 'installPromptShown' and 'installPromptAnswered'
	//				events with the user choice ('accepted' or 'dismissed')
	// ------------------------------------------------------------------------
	async prompt(){
		let installPrompt = this.#installPrompt;

		if(!installPrompt){
			return;
		}

		// the browser allows using the install prompt only once
		this.#installPrompt = null;

		window.dispatchEvent(new CustomEvent('installPromptShown'));

		installPrompt.prompt();
		let { outcome } = await installPrompt.userChoice;

		window.dispatchEvent(new CustomEvent('installPromptAnswered', { detail: { outcome } }));
	};
};



// exports
// ------------------------------------------------------------------------
export default new Install();
