<template>
	<transition name="overlay">
		<div class="container" v-show="isActiveImageSet" @click.self="close">
			<transition name="popup">
				<div class="image-detail" v-show="isActiveImageSet">
					<img class="image-detail__image" :src="image.download_url" />
					<div class="image-detail__controls">
						<button class="control control--download" @click="download">
							<img class="control__image" src="../assets/images/download.svg" />
						</button>
						<a download="instastock" class="control control--download-link" ref="downloadLink" />
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
								:href="item.value"
								>{{ item.value }}</a
							>
							<div v-else :key="`${item.label}-value`" class="image-detail__info__value">
								{{ item.value }}
							</div>
						</template>
					</div>
					<!-- <img class="image-detail__close" src="../assets/images/arrow.svg" @click="close" /> -->
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import HeartIndicator from "./HeartIndicator";

import { GETTER_TYPES, MUTATION_TYPES } from "../store";

export default {
	name: "ImageDetail",
	components: {
		HeartIndicator
	},
	computed: {
		...mapGetters({
			image: GETTER_TYPES.ACTIVE_IMAGE,
			bookmarkedIds: GETTER_TYPES.BOOKMARKED_IDS
		}),
		isActiveImageSet: function() {
			return this.$store.state.activeImageId !== null;
		},
		isImageBookmarked: function() {
			if (!this.image) {
				return false;
			}

			return this.bookmarkedIds.includes(this.image.id);
		},
		info: function() {
			if (!this.image) {
				return [];
			}

			return [
				{ label: "ID", value: this.image.id },
				{ label: "Height", value: this.image.height },
				{ label: "Width", value: this.image.width },
				{ label: "Author", value: this.image.author },
				{ label: "Source", value: this.image.url, type: "link" }
			];
		}
	},
	methods: {
		...mapMutations({
			setActiveImageId: MUTATION_TYPES.SET_ACTIVE_IMAGE_ID,
			toggleBookmark: MUTATION_TYPES.TOGGLE_BOOKMARK
		}),
		close: function() {
			this.setActiveImageId(null);
		},
		toggleImageBookmark: function() {
			this.toggleBookmark(this.image.id);
		},
		download: async function() {
			const response = await fetch(this.image.download_url);

			const blob = await response.blob();

			const imageDownloadUrl = URL.createObjectURL(blob);

			this.$refs.downloadLink.href = imageDownloadUrl;
			this.$refs.downloadLink.click();
		}
	}
};
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
		width: 100%;
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

		&__label {
			font-weight: bold;
			font-variant: small-caps;
		}

		&__value {
			margin-bottom: 1rem;
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

	&--download-link {
		display: none;
	}
}
</style>
