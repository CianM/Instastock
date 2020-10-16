import Vue from "vue";

import App from "./App.vue";

import store from "./store";

Vue.config.productionTip = false;

// TODO: Move height calculation and update on window resize

// Calculate 1% of visible window height (in px)
const vh = window.innerHeight * 0.01;

// Set as CSS variable `--vh`
document.documentElement.style.setProperty(`--vh`, `${vh}px`);

new Vue({
	el: "#app",
	store,
	render: h => h(App)
});
