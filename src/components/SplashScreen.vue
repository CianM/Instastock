<template>
	<div class="splash">
		<h1 class="splash__title">Instastock</h1>
		<p class="splash__intro">
			Browse a selection of stock images from multiple sources and easily bookmark them for downloading or
			sharing.
		</p>
		<p class="splash__intro">
			Perfect for curating collections of images for website backgrounds, brand imagery, and more.
		</p>
		<button @click="startClickHandler" class="splash__continue">Start</button>
	</div>
</template>

<script>
export default {
	name: "SplashScreen",
	methods: {
		startClickHandler: function() {
			this.$emit("start");
		}
	}
};
</script>

<style scoped lang="scss">
.splash {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: grid;
	align-content: start;
	justify-items: center;
	background-color: $color-alabaster;
	width: 100vw;
	height: calc(var(--vh) * 100);
	padding: 5rem 2rem;
	box-sizing: border-box;
	z-index: 15;

	&__title {
		font-family: $font-family-sansita-swashed;
		font-size: 3rem;
	}
}
</style>
