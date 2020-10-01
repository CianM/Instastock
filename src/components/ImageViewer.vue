<template>
	<div class="image-viewer" ref="imageSlider">
		<ImageCard
			v-for="image in images"
			:active="savedImages.includes(image.id)"
			:image="image"
			:key="image.id"
			@toggle-saved-state="handleImageClick"
		></ImageCard>
	</div>
</template>

<script>
import ImageCard from "./ImageCard.vue";

import { LoremPicsumService } from "../services/lorem-picsum.service";

const service = new LoremPicsumService();

export default {
	name: "ImageViewer",
	components: {
		ImageCard
	},
	data: function() {
		return {
			images: [], // List of all images
			savedImages: [] // Saved image IDs
		};
	},
	methods: {
		handleImageClick: function(id) {
			this.toggleSavedPhoto(id);

			// If image has just been saved scroll to next image
			if (this.savedImages.includes(id)) {
				this.showNextImage();
			}
		},
		toggleSavedPhoto: function(id) {
			// Has image already been saved?
			const isSaved = this.savedImages.includes(id);

			// Toggle image saved state
			this.savedImages = isSaved ? this.savedImages.filter(savedId => savedId !== id) : [...this.savedImages, id];
		},
		showNextImage: function() {
			// Move to next image to the right
			setTimeout(() => (this.$refs.imageSlider.scrollLeft += window.innerWidth), 500);
		}
	},
	mounted: function() {
		// Fetch list of images
		service.fetchImages().then(images => (this.images = images));
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
