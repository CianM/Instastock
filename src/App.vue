<template>
	<div id="app">
		<ImageViewer />
	</div>
</template>

<script>
import ImageViewer from "./components/ImageViewer.vue";

export default {
	name: "App",
	components: {
		ImageViewer
	}
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
