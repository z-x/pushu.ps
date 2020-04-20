<!--  
	The animated background
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import { fade } from 'svelte/transition';

	// vary the animation
	// ------------------------------------------------------------------------
	let props = document.documentElement.style;

	props.setProperty('--blur-smallest', random(0, 8) + 'px');
	props.setProperty('--blur-small', random(10, 18) + 'px');
	props.setProperty('--blur-middle', random(19, 35) + 'px');
	props.setProperty('--blur-big', random(38, 45) + 'px');
	props.setProperty('--blur-biggest', random(50, 70) + 'px');

	props.setProperty('--y-middle', '-' + random(2, 15) + '%');
	props.setProperty('--y-big', '-' + random(25, 35) + '%');
	props.setProperty('--y-biggest', '-' + (($state.page === 'Home') ? random(35, 55) : random(25, 70)) + '%');
	props.setProperty('--y-large', '-' + (($state.page === 'Home') ? random(45, 60) : random(45, 80)) + '%');

	props.setProperty('--x-smallest', '-' + random(7, 15) + '%');
	props.setProperty('--x-small', '-' + random(1, 7) + '%');
	props.setProperty('--x-middle', random(1, 7) + '%');
	props.setProperty('--x-big', random(3, 10) + '%');
	props.setProperty('--x-large', random(7, 15) + '%');

	props.setProperty('--rot-smallest', '-' + random(1, 15) + 'deg');
	props.setProperty('--rot-smaller', random(0, 8) + 'deg');
	props.setProperty('--rot-small', random(8, 20) + 'deg');
	props.setProperty('--rot-middle', random(27, 37) + 'deg');
	props.setProperty('--rot-big', random(37, 50) + 'deg');

	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

</script>


<style>

	:global(:root) {
		--blur-smallest: 5px;
		--blur-small: 10px;
		--blur-middle: 20px;
		--blur-big: 40px;
		--blur-biggest: 50px;

		--y-middle: -10%;
		--y-big: -30%;
		--y-biggest: -40%;
		--y-large: -50%;

		--x-smallest: -10%;
		--x-small: -2%;
		--x-middle: 3%;
		--x-big: 5%;
		--x-large: 10%;

		--rot-smallest: -10deg;
		--rot-smaller: 5deg;
		--rot-small: 10deg;
		--rot-middle: 30deg;
		--rot-big: 40deg;
	}

	.background {
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
	}

	.background:after {
		width: 90vh;
		height: 90vh;
		position: absolute;
		top: 50%;
		right: -40vh;
		z-index: -2;

		animation-name: big;
		animation-duration: 500s;
		animation-iteration-count: infinite;

		background-image: radial-gradient(#f6bb51 5%, rgba(246, 187, 81, 0) 40%);

		content: '';
	}

	.background.finish:after {
		background-image: radial-gradient(#50d6f7 5%, rgba(80, 214, 247, 0) 40%)
	}

	.background:before {
		width: 50vh;
		height: 50vh;
		position: absolute;
		top: 52%;
		right: -35vw;
		z-index: -1;

		background-image: url('../img/overlay-yellow.png');
		background-size: contain;
		background-repeat: no-repeat;
		animation-name: small;
		animation-duration: 500s;
		animation-iteration-count: infinite;

		content: '';
	}

	.background.finish:before {
		background-image: url('../img/overlay-blue.png');
	}

	@keyframes small {
		0% {
			opacity: 0;
			filter: blur(var(--blur-small));
			transform: translateX(0) translateY(0) rotate(0);
		}

		4% {
			opacity: .5;
			filter: blur(var(--blur-small));
			transform: translateY(var(--y-middle)) rotate(var(--rot-big));
		}

		6% {
			opacity: .4;
			filter: blur(var(--blur-middle));
			transform: translateX(var(--x-middle)) rotate(var(--rot-middle));
		}

		10% {
			opacity: .3;
			filter: blur(var(--blur-big));
			transform: translateX(0) translateY(var(--y-middle)) rotate(var(--rot-small));
		}

		20% {
			opacity: .8;
			filter: blur(var(--blur-small));
			transform: translateX(var(--x-small)) translateY(var(--y-large)) rotate(0);
		}

		22% {
			opacity: .3;
			filter: blur(var(--blur-small));
			transform: translateX(var(--x-big)) translateY(var(--y-bigger)) rotate(var(--rot-small));
		}

		25% {
			opacity: 1;
			filter: blur(var(--blur-big));
			transform: translateX(0%) translateY(var(--y-bigger));
		}

		35% {
			opacity: .4;
			filter: blur(var(--blur-small));
			transform: translateX(var(--x-small)) translateY(var(--y-bigger)) rotate(var(--rot-big));
		}

		42% {
			opacity: .5;
			filter: blur(var(--blur-middle));
			transform: translateX(0) translateY(var(--y-big)) rotate(var(--rot-middle));
		}

		48% {
			opacity: .4;
			filter: blur(var(--blur-biggest));
			transform: translateX(var(--x-large)) translateY(var(--y-bigger)) rotate(var(--rot-smaller));
		}

		57% {
			opacity: 1;
			filter: blur(var(--blur-small));
			transform: translateX(0) translateY(var(--y-big)) rotate(var(--rot-smallest));
		}

		65% {
			opacity: .4;
			filter: blur(var(--blur-smallest));
			transform: translateX(0) translateY(var(--y-biggest)) rotate(var(--rot-small));
		}

		80% {
			opacity: 1;
			filter: blur(var(--blur-biggest));
			transform: translateX(var(--x-small)) translateY(var(--y-large)) rotate(var(--rot-smallest));
		}

		100% {
			opacity: 0;
			filter: blur(var(--blur-smallest));
			transform: translateX(0) translateY(0) rotate(0);
		}
	}

	@keyframes big {
		0% {
			opacity: 0;
			filter: blur(0);
			transform: translateX(0) translateY(0);
		}

		4% {
			opacity: .7;
			filter: blur(0);
			transform: translateY(var(--y-middle));
		}

		6% {
			opacity: .8;
			filter: blur(var(--blur-middle));
			transform: translateX(var(--x-smallest));
		}

		10% {
			opacity: .7;
			filter: blur(0);
			transform: translateX(0) translateY(var(--y-middle));
		}

		20% {
			opacity: 1;
			filter: blur(var(--blur-small));
			transform: translateX(var(--x-small)) translateY(var(--y-large));
		}

		22% {
			opacity: .8;
			filter: blur(0);
			transform: translateX(var(--x-middle)) translateY(var(--y-biggest));
		}

		25% {
			opacity: 1;
			filter: blur(var(--blur-smallest));
			transform: translateX(0%) translateY(var(--y-biggest));
		}

		35% {
			opacity: .9;
			filter: blur(var(--blur-big));
			transform: translateX(var(--x-small)) translateY(var(--y-big));
		}

		42% {
			opacity: .3;
			filter: blur(var(--blur-middle));
			transform: translateX(0) translateY(var(--y-biggest));
		}

		48% {
			opacity: 1;
			filter: blur(var(--blur-biggest));
			transform: translateX(var(--x-large)) translateY(var(--y-biggest));
		}

		57% {
			opacity: .8;
			filter: blur(var(--blur-small));
			transform: translateX(0) translateY(var(--y-big));
		}

		65% {
			opacity: 1;
			filter: blur(var(--blur-smallest));
			transform: translateX(0) translateY(var(--y-biggest));
		}

		80% {
			opacity: .9;
			filter: blur(var(--blur-small));
			transform: translateX(var(--x-small)) translateY(var(--y-biggest));
		}

		100% {
			opacity: 0;
			filter: blur(0);
			transform: translateX(0) translateY(0);
		}
	}

</style>




{#if $state.page === 'Home'}
	<div out:fade class="background"></div>
{:else if $state.page === 'Finish'}
	<div out:fade class="background finish"></div>
{/if}