import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Calculate 1% of visible window height (in px)
const vh = window.innerHeight * 0.01;

// Set as CSS variable `--vh`
document.documentElement.style.setProperty(`--vh`, `${vh}px`);

new Vue({
	render: h => h(App)
}).$mount("#app");
