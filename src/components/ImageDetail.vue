<template>
	<div class="container">
		<div class="image-detail">
			<h1>Hello - {{ image.id }}</h1>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import { GETTER_TYPES } from "../store";

export default {
	name: "ImageDetail",
	computed: {
		...mapGetters({
			image: GETTER_TYPES.ACTIVE_IMAGE
		})
	}
};
</script>

<style lang="scss" scoped>
@keyframes grow {
	0% {
		height: 0;
	}
	100% {
		height: calc(var(--vh) * 90);
	}
}

@keyframes fade-in {
	0% {
		background-color: rgba($color-outer-space, 0);
	}
	100% {
		background-color: rgba($color-outer-space, 0.5);
	}
}

.container {
	height: calc(var(--vh) * 100);
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 14;
	background-color: rgba($color-outer-space, 0.5);
	animation: fade-in 0.25s linear 1;
}

.image-detail {
	position: absolute;
	bottom: 0;
	left: 0;
	display: grid;
	grid-template-rows: auto 1fr;
	background-color: $color-alabaster;
	height: calc(var(--vh) * 90);
	width: 100vw;
	z-index: 15;
	animation: grow 0.5s ease-in-out 1;

	box-shadow: 0px 0px 8px 0px rgba($color-outer-space, 0.25); // rgba(107, 113, 127, 0.7);
	border-top-left-radius: 2rem;
	border-top-right-radius: 2rem;
}
</style>
