<template>
	<div id="app">
		<ImageViewer
			:images="images"
			:bookmarkedImageIds="bookmarkedImageIds"
			@toggle-bookmarked-image="toggleBookmarkedImage"
		/>
		<BookmarkPopup :images="bookmarkedImages" />
		<SplashScreen v-if="showSplashScreen" @start="closeSplashScreen" />
	</div>
</template>

<script>
import BookmarkPopup from "./components/BookmarkPopup.vue";
import ImageViewer from "./components/ImageViewer.vue";
import SplashScreen from "./components/SplashScreen.vue";

import { LoremPicsumService } from "./services/lorem-picsum.service";

const service = new LoremPicsumService();

export default {
	name: "App",
	components: {
		BookmarkPopup,
		ImageViewer,
		SplashScreen
	},
	data: function() {
		return {
			allImages: {
				allIds: [],
				byId: {}
			},
			bookmarkedImageIds: [],
			showSplashScreen: true
		};
	},
	computed: {
		images: function() {
			return this.allImages.allIds.map(id => this.allImages.byId[id]);
		},
		bookmarkedImages: function() {
			return this.images.filter(image => this.bookmarkedImageIds.includes(image.id));
		}
	},
	mounted: function() {
		// Fetch list of images
		service.fetchImages().then(images => {
			this.allImages = {
				allIds: images.map(image => image.id),
				byId: images.reduce((acc, image) => ({ ...acc, [image.id]: image }), {})
			};
		});
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
