/*
	Custom transitions to use with Svelte
*/



// imports
// ------------------------------------------------------------------------
import { quintOut, quintInOut, backIn } from 'svelte/easing';


// transition: 	slightly slides from top or bottom and fades in from 0 opacity
// options: 	delay (int), duration (int), from ('top' or 'bottom'),
//				distance to move (int)
// ------------------------------------------------------------------------
export let appear = function(node, {
	delay = 0,
	duration = 400,
	from = 'top',
	distance = 20
}){
	return {
		delay,
		duration,
		css: (t) => {
			const eased = quintOut(t);
			const modifier = (from === 'bottom') ? -1 : 1;

			return `opacity: ${t}; transform: translateY(${modifier * (eased * distance - distance)}px);` }
	}
};


// transition: 	slides in or out the page from right to left
// options: 	delay (int), duration (int), direction ('in' or 'out')
// ------------------------------------------------------------------------
export let slide = function(node, {
	delay = 0,
	duration = 500,
	direction = 'in'
}){
	return {
		delay,
		duration,
		css: (t, u) => {
			const eased = (direction === 'out') ? quintInOut(t) : -quintInOut(t);
			const modifier = (direction === 'out') ? 1 : -1;
			
			return `transform: translateX(${(eased * 100 - modifier * 100)}vw);`
		}
	}
};


// transition: 	slides in or out from top of the page
// options: 	delay (int), duration (int), direction ('in' or 'out')
// ------------------------------------------------------------------------
export let fromTop = function(node, {
	delay = 0,
	duration = 600
}){
	return {
		delay,
		duration,
		css: (t, u) => {
			const eased = backIn(u);
			
			return `transform: translateY(${(eased * -110)}vh);`
		}
	}
};