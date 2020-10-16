<template>
	<div :class="['popup-container', { 'popup-container--open': isOpen }]">
		<button
			:class="['popup-container__download', { 'popup-container__download--active': isOpen }]"
			@click="downloadAll"
		>
			<img class="popup-container__download__icon" src="../assets/images/download.svg" />
		</button>
		<BookmarkPopupButton :isPopupOpen="isOpen" :count="images.length" @click="toggle" />

		<div class="popup-container__body">
			<h1 class="popup-container__body__title">Bookmarked Images</h1>
			<div class="popup-container__body__bookmarks">
				<p v-if="images.length === 0">No images bookmarked</p>
				<div class="list">
					<div
						@click="setActiveImageId(image.id)"
						class="list__item"
						v-for="image in images"
						:key="image.id"
						:style="{ backgroundImage: `url(${thumbnailsByImageId[image.id] || image.url})` }"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

import BookmarkPopupButton from "./BookmarkPopupButton.vue";

import { InstastockImage } from "@/interfaces";
import { GetterTypes, MutationTypes } from "@/store";
import { downloadFile, formatFileName, getExtensionFromMimeType, zipFiles } from "@/utils";

export default Vue.extend({
	name: "BookmarkPopup",
	components: {
		BookmarkPopupButton
	},
	data: function() {
		return {
			isOpen: false
		};
	},
	computed: {
		...mapGetters({
			images: GetterTypes.BOOKMARKED_IMAGES,
			thumbnailsByImageId: GetterTypes.GET_THUMBNAILS
		})
	},
	methods: {
		toggle: function() {
			this.isOpen ? this.close() : this.open();
		},
		open: function() {
			this.isOpen = true;
		},
		close: function() {
			this.isOpen = false;
		},
		downloadAll: async function() {
			const images: InstastockImage[] = this.images;

			// Create promises to get all files
			const filePromises = images.map(async image => {
				// Fetch image
				const response = await fetch(image.url);
				const blob = await response.blob();

				const extension = getExtensionFromMimeType(blob.type);

				// Format image file name
				const fileName = formatFileName({ extension, imageId: image.id });

				return new File([blob], fileName, { type: blob.type });
			});

			const files = await Promise.all(filePromises);

			// Zip all files together for one download
			const zippedFile = await zipFiles({ files });

			downloadFile(zippedFile);
		},
		...mapMutations({
			setActiveImageId: MutationTypes.SET_ACTIVE_IMAGE_ID
		})
	}
});
</script>

<style lang="scss" scoped>
$button-size: 3rem;

.popup-container {
	$popup-container: &;

	position: relative;

	&__download {
		position: absolute;
		bottom: 5rem;
		left: 1rem;
		height: 3rem;
		width: 3rem;
		border-radius: 50%;
		background-color: transparent;
		padding: 0.5rem;
		border: 0;
		opacity: 0;
		z-index: 10;
		transition: opacity 0.25s;

		&--active {
			opacity: 1;
		}
	}

	&__body {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		display: grid;
		grid-template-rows: auto 1fr;
		background-color: $color-alabaster;
		border-radius: 50%;
		height: $button-size;
		width: $button-size;
		opacity: 0;
		z-index: 5;
		transition: height 0.5s, width 0.25s, border-radius 0.5s, opacity, 0.5s;

		&__title {
			font-family: $font-family-sansita-swashed;
		}

		&__bookmarks {
			overflow-x: auto;
		}
	}

	&--open {
		#{$popup-container}__body {
			bottom: 0;
			left: 0;
			height: calc(var(--vh) * 100);
			width: 100vw;
			border-radius: 0;
			opacity: 1;
		}
	}
}

.list {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1rem;
	padding: 1rem;

	&__item {
		width: 100%;
		min-height: 2rem;
		height: 100%;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;

		&::before {
			content: "";
			padding-bottom: 100%;
			display: inline-block;
			vertical-align: top;
		}
	}
}
</style>
