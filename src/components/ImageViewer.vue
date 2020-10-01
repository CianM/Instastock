<template>
	<div class="image-viewer" ref="imageSlider">
		<ImageCard
			v-for="image in images"
			:active="bookmarkedImageIds.includes(image.id)"
			:image="image"
			:key="image.id"
			@card-clicked="handleImageClick"
		></ImageCard>
	</div>
</template>

<script>
import ImageCard from "./ImageCard.vue";

export default {
	name: "ImageViewer",
	components: {
		ImageCard
	},
	props: {
		images: {
			type: Array,
			default: () => []
		},
		bookmarkedImageIds: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		handleImageClick: function(id) {
			this.toggleBookmarkedImage(id);

			// If image has just been saved scroll to next image.
			if (!this.bookmarkedImageIds.includes(id)) {
				this.showNextImage();
			}
		},
		toggleBookmarkedImage: function(id) {
			this.$emit("toggle-bookmarked-image", id);
		},
		showNextImage: function() {
			// Move to next image to the right
			setTimeout(() => (this.$refs.imageSlider.scrollLeft += window.innerWidth), 500);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image-viewer {
	display: grid;
	grid-auto-flow: column;
	row-gap: 1rem;
	width: 100%;
	overflow: auto;
	height: calc(var(--vh) * 100);
	scroll-snap-type: x mandatory;
}
</style>
