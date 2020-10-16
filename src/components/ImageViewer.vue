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

<script lang="ts">
import Vue, { PropType } from "vue";

import ImageCard from "./ImageCard.vue";

import { InstastockImage } from "@/interfaces";

export default Vue.extend({
	name: "ImageViewer",
	components: {
		ImageCard
	},
	props: {
		images: {
			type: Array as PropType<InstastockImage[]>,
			default: () => []
		},
		bookmarkedImageIds: {
			type: Array as PropType<string[]>,
			default: () => []
		}
	},
	methods: {
		handleImageClick: function(id: string) {
			this.toggleBookmarkedImage(id);

			// If image has just been saved scroll to next image.
			if (!this.bookmarkedImageIds.includes(id)) {
				this.showNextImage();
			}
		},
		toggleBookmarkedImage: function(id: string) {
			this.$emit("toggle-bookmarked-image", id);
		},
		showNextImage: function() {
			// Move to next image to the right
			setTimeout(() => {
				const slider = this.$refs.imageSlider as HTMLDivElement;

				slider.scrollLeft += window.innerWidth;
			}, 500);
		}
	}
});
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
