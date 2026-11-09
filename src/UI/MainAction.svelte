<!--  
	The main call to action button that switches to next page
	Usage: <MainAction>Button label</MainAction>
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import { appear } from '../Helpers/transitions.js';


	// properties
	// ------------------------------------------------------------------------
	let {
		// what page do you want to switch to
		changePageTo = null,
		// the delay after which the button will appear on the page
		delay = 400,
		// if the area for clicking should forced to small
		forceSmallClickArea = false,
		// the function to call when the button is clicked (function)
		onMainAction,
		// the content of the button
		children
	} = $props();


	// purpose:		performs the main action assigned to the button
	//				most likely changes the page or just calls the onMainAction
	// returns:		shows changed page, or calls the onMainAction function
	// ------------------------------------------------------------------------
	let action = () => {
		onMainAction?.();

		if(changePageTo) {
			appState.setPage(changePageTo);
		}
	};


	// pressed state
	// the label tilts in 3D so the point under the finger sinks into the screen
	// ------------------------------------------------------------------------
	// the maximum tilt in degrees
	const maxTilt = 8;

	// the label element and its current transform
	let label;
	let tilt = $state('');
	// if the pointer is down on the button
	let pressing = false;


	// purpose:		tilts the label so the given point goes into the screen
	// arguments:	x, y - the point in viewport pixels
	// returns:		sets the tilt transform for the label
	// ------------------------------------------------------------------------
	let press = (x, y) => {
		// the offsets ignore transforms, so the measurement stays stable while tilted
		const button = label.offsetParent.getBoundingClientRect();
		const width = label.offsetWidth;
		const height = label.offsetHeight;
		const clamp = value => Math.max(-1, Math.min(1, value));
		const nx = clamp((x - (button.left + label.offsetLeft + width / 2)) / (width / 2));
		const ny = clamp((y - (button.top + label.offsetTop + height / 2)) / (height / 2));
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const rotation = reducedMotion ? 0 : maxTilt;

		// the whole label also sinks a little, more when pressed near the middle
		const depth = -(maxTilt * 1.2) * (1 - .4 * Math.hypot(nx, ny) / Math.SQRT2);

		// rotateY > 0 sends the right side away, rotateX < 0 sends the bottom away
		tilt = `perspective(700px) translateZ(${depth.toFixed(1)}px) rotateX(${(-rotation * ny).toFixed(2)}deg) rotateY(${(rotation * nx).toFixed(2)}deg)`;
	};


	// purpose:		brings the label back to rest
	// ------------------------------------------------------------------------
	let release = () => {
		pressing = false;
		tilt = '';
	};


	// purpose:		starts the press at the pointer position
	// arguments:	event - the pointer event
	// ------------------------------------------------------------------------
	let onPointerDown = event => {
		if(event.button !== 0) {
			return;
		}

		pressing = true;
		event.currentTarget.setPointerCapture?.(event.pointerId);
		press(event.clientX, event.clientY);
	};


	// purpose:		follows the finger while the button is held
	// arguments:	event - the pointer event
	// ------------------------------------------------------------------------
	let onPointerMove = event => {
		if(pressing) {
			press(event.clientX, event.clientY);
		}
	};


	// purpose:		presses the button from the keyboard, from the lower left part of the label
	// arguments:	event - the keyboard event
	// ------------------------------------------------------------------------
	let onKeyDown = event => {
		if((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
			const button = label.offsetParent.getBoundingClientRect();
			press(button.left + label.offsetLeft + label.offsetWidth * .2, button.top + label.offsetTop + label.offsetHeight * .75);
		}
	};

</script>

<style>

	.action-main {
		padding-top: .8em;

		text-align: left;
		text-transform: uppercase;
		line-height: 1.05em;
		font-size: 2.75rem;
		font-weight: 600;

		user-select: none;
		touch-action: manipulation;
		position: relative;
	}

	.action-main-label {
		display: block;

		transform-origin: 50% 50%;
		transition: transform .14s cubic-bezier(.3, 0, .2, 1);
	}

	.action-main-label-pressed {
		transition-duration: .06s;
	}

	.action-main:not(.action-main-small):only-of-type {
		padding-top: 16vh;
	}

	@media (min-height: 551px) and (max-height: 630px) {
		.action-main {
			font-size: 2rem;
		}
	}

</style>




<button
	in:appear|global={{ from: 'bottom', delay }}
	type="button"
	class={['action-main', forceSmallClickArea && 'action-main-small']}
	onclick={action}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={release}
	onpointercancel={release}
	onlostpointercapture={release}
	onkeydown={onKeyDown}
	onkeyup={release}
	onblur={release}
>
	<span
		bind:this={label}
		class={['action-main-label', tilt && 'action-main-label-pressed']}
		style:transform={tilt || null}
	>
		{@render children?.()}
	</span>
</button>