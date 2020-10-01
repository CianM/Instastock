<template>
	<div id="app">
		<ImageViewer
			:images="images"
			:bookmarkedImageIds="bookmarkedImageIds"
			@toggle-bookmarked-image="toggleBookmarkedImage"
		/>
		<SplashScreen v-if="showSplashScreen" @start="closeSplashScreen" />
	</div>
</template>

<script>
import ImageViewer from "./components/ImageViewer.vue";
import SplashScreen from "./components/SplashScreen.vue";

import { LoremPicsumService } from "./services/lorem-picsum.service";

const service = new LoremPicsumService();

export default {
	name: "App",
	components: {
		ImageViewer,
		SplashScreen
	},
	data: function() {
		return {
			images: [], // List of all images
			bookmarkedImageIds: [],
			showSplashScreen: true
		};
	},
	mounted: function() {
		// Fetch list of images
		service.fetchImages().then(images => (this.images = images));
	},
	methods: {
		closeSplashScreen: function() {
			this.showSplashScreen = false;
		},
		toggleBookmarkedImage: function(id) {
			// Has image already been saved?
			const isSaved = this.bookmarkedImageIds.includes(id);

			// Toggle image saved state
			this.bookmarkedImageIds = isSaved
				? this.bookmarkedImageIds.filter(savedId => savedId !== id)
				: [...this.bookmarkedImageIds, id];
		}
	}
};
</script>

<style lang="scss">
#app {
	color: $color-outer-space;
	font-family: $font-family-raleway;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
</style>
