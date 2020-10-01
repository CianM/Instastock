<template>
	<div
		class="card"
		:id="image.id"
		:style="{ backgroundImage: `url(${image.download_url})` }"
		@click="handleImageClick(image.id)"
	>
		<img class="card__image" :src="image.download_url" />
		<div class="card__indicator-container">
			<HeartIndicator :active="active" />
		</div>
	</div>
</template>

<script>
import HeartIndicator from "./HeartIndicator.vue";

export default {
	name: "ImageCard",
	props: {
		// Image config
		image: {
			type: Object,
			required: true
		},
		// Is the image saved?
		active: {
			type: Boolean,
			default: false
		}
	},
	components: {
		HeartIndicator
	},
	methods: {
		handleImageClick: function(id) {
			this.$emit("toggle-saved-state", id);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
	position: relative;
	display: grid;
	place-content: center;
	height: calc(var(--vh) * 100);
	width: 100vw;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	scroll-snap-align: start;

	// Fill any space behind image with blurred version
	&::before {
		content: "";
		position: absolute;
		height: calc(var(--vh) * 100);
		width: 100vw;
		backdrop-filter: blur(1rem);
	}

	&__image {
		position: relative;
		height: auto;
		width: 100%;
	}

	&__indicator-container {
		height: 2rem;
		width: 2rem;
		position: absolute;
		bottom: 1rem;
		left: 1rem;
	}
}
</style>
