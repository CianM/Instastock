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

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

import BookmarkPopup from "./components/BookmarkPopup.vue";
import ImageDetail from "./components/ImageDetail.vue";
import ImageViewer from "./components/ImageViewer.vue";
import SplashScreen from "./components/SplashScreen.vue";

import { ActionTypes, GetterTypes, MutationTypes } from "./store";

export default Vue.extend({
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
			images: GetterTypes.IMAGES,
			bookmarkedImageIds: GetterTypes.BOOKMARKED_IDS
		})
	},
	mounted: function() {
		// Fetch list of images
		this.fetchImages();
	},
	methods: {
		...mapActions({
			fetchImages: ActionTypes.FETCH_IMAGES
		}),
		...mapMutations({
			toggleBookmarkedImage: MutationTypes.TOGGLE_BOOKMARK
		}),
		closeSplashScreen: function() {
			this.showSplashScreen = false;
		}
	}
});
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
