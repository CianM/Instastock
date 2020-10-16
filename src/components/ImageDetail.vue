<template>
	<transition name="overlay">
		<div class="container" v-show="isActiveImageSet" @click.self="close">
			<transition name="popup">
				<div class="image-detail" v-show="isActiveImageSet">
					<img class="image-detail__image" :src="image.url" />
					<div class="image-detail__controls">
						<button class="control control--download" @click="download">
							<img class="control__image" src="../assets/images/download.svg" />
						</button>
						<HeartIndicator border :active="isImageBookmarked" @heart-clicked="toggleImageBookmark" />
					</div>
					<div class="image-detail__info">
						<template v-for="item in info">
							<div :key="`${item.label}-label}`" class="image-detail__info__label">{{ item.label }}</div>
							<a
								v-if="item.type === 'link'"
								rel="noopener noreferrer"
								target="_blank"
								:key="`${item.label}-link`"
								:href="item.value(image)"
								>{{ item.value(image) }}</a
							>
							<div v-else :key="`${item.label}-value`" class="image-detail__info__value">
								{{ item.value(image) }}
							</div>
						</template>
					</div>
					<!-- <img class="image-detail__close" src="../assets/images/arrow.svg" @click="close" /> -->
				</div>
			</transition>
		</div>
	</transition>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

import HeartIndicator from "./HeartIndicator.vue";

import { SERVICE_MAP } from "@/api";
import { InfoItem, InstastockImage } from "@/interfaces";
import { GetterTypes, MutationTypes } from "@/store";
import { downloadFile, formatFileName, getExtensionFromMimeType } from "@/utils";

export default Vue.extend({
	name: "ImageDetail",
	components: {
		HeartIndicator
	},
	computed: {
		...mapGetters({
			image: GetterTypes.ACTIVE_IMAGE,
			bookmarkedIds: GetterTypes.BOOKMARKED_IDS
		}),
		isActiveImageSet: function(): boolean {
			return this.$store.state.activeImageId !== null;
		},
		isImageBookmarked: function(): boolean {
			if (!this.image) {
				return false;
			}

			return this.bookmarkedIds.includes(this.image.id);
		},
		info: function(): InfoItem[] {
			if (!this.image) {
				return [];
			}

			const imageSource = (this.image as InstastockImage).source;

			const sourceService = SERVICE_MAP[imageSource];

			if (sourceService) {
				return sourceService.IMAGE_DETAILS_CONFIG || [];
			}

			return [];
		}
	},
	methods: {
		...mapMutations({
			setActiveImageId: MutationTypes.SET_ACTIVE_IMAGE_ID,
			toggleBookmark: MutationTypes.TOGGLE_BOOKMARK
		}),
		close: function() {
			this.setActiveImageId(null);
		},
		toggleImageBookmark: function() {
			this.toggleBookmark(this.image.id);
		},
		download: async function() {
			const image: InstastockImage = this.image;

			const response = await fetch(image.url);
			const blob = await response.blob();

			const extension = getExtensionFromMimeType(blob.type);
			const fileName = formatFileName({ extension, imageId: image.id });

			const file = new File([blob], fileName, { type: blob.type });

			downloadFile(file);
		}
	}
});
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

@keyframes fade {
	0% {
		background-color: rgba($color-outer-space, 0);
	}
	100% {
		background-color: rgba($color-outer-space, 0.5);
	}
}

// Overlay behind detail popup
.container {
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba($color-outer-space, 0.5);
	height: calc(var(--vh) * 100);
	width: 100vw;
	z-index: 14;

	&.overlay-enter-active,
	&.overlay-leave-active {
		animation: fade 0.5s linear 1;
	}

	&.overlay-leave-active {
		animation-direction: reverse;
	}
}

.image-detail {
	position: absolute;
	bottom: 0;
	left: 0;
	display: grid;
	row-gap: 1rem;
	grid-template-rows: auto 3rem 1fr;
	background-color: $color-alabaster;
	border-top-left-radius: 2rem;
	border-top-right-radius: 2rem;
	height: calc(var(--vh) * 90);
	width: 100vw;
	box-shadow: 0px 0px 8px 0px rgba($color-outer-space, 0.25); // rgba(107, 113, 127, 0.7);
	padding: 3rem 2rem 3rem;
	box-sizing: border-box;
	z-index: 15;

	&.popup-enter-active,
	&.popup-leave-active {
		animation: grow 0.5s ease-in-out 1;
	}

	&.popup-leave-active {
		animation-direction: reverse;
	}

	&__image {
		max-height: calc(var(--vh) * 30);
		max-width: 100%;
		background-color: rgba($color-outer-space, 0.1);
		margin: 0 auto;
	}

	&__controls {
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
		grid-auto-columns: 3rem;
		column-gap: 1rem;
	}

	&__info {
		display: grid;
		row-gap: 0.5rem;
		column-gap: 2rem;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: start;
		justify-items: start;
		text-align: left;
		word-break: break-word;

		&__label {
			font-weight: bold;
			font-variant: small-caps;
		}
	}

	&__close {
		align-self: end;
		height: 3rem;
		width: 3rem;
		padding: 0.5rem 0;
		box-sizing: border-box;
	}
}

.control {
	height: 3rem;
	width: 3rem;
	border-radius: 50%;
	background-color: transparent;
	padding: 0.5rem;
	border: 0;

	&__image {
		height: 100%;
		width: 100%;
	}
}
</style>
