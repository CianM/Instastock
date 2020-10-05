<template>
	<div id="app">
		<SplashScreen v-if="showSplashScreen" @start="closeSplashScreen" />
		<ImageViewer
			:images="images"
			:bookmarkedImageIds="bookmarkedImageIds"
			@toggle-bookmarked-image="toggleBookmarkedImage"
		/>
		<BookmarkPopup />
		<ImageDetail />
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import BookmarkPopup from "./components/BookmarkPopup.vue";
import ImageDetail from "./components/ImageDetail";
import ImageViewer from "./components/ImageViewer.vue";
import SplashScreen from "./components/SplashScreen.vue";

import { ACTION_TYPES, MUTATION_TYPES, GETTER_TYPES } from "./store";

export default {
	name: "App",
	components: {
		BookmarkPopup,
		ImageDetail,
		ImageViewer,
		SplashScreen
	},
	data: function() {
		return {
			showSplashScreen: false
		};
	},
	computed: {
		...mapGetters({
			images: GETTER_TYPES.IMAGES
		}),
		bookmarkedImageIds: function() {
			return this.$store.state.bookmarkedImageIds;
		}
	},
	mounted: function() {
		// Fetch list of images
		this.fetchImages();
	},
	methods: {
		...mapActions({
			fetchImages: ACTION_TYPES.FETCH_IMAGES
		}),
		...mapMutations({
			toggleBookmarkedImage: MUTATION_TYPES.TOGGLE_BOOKMARK
		}),
		closeSplashScreen: function() {
			this.showSplashScreen = false;
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
