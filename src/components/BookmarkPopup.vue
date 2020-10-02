<template>
	<div :class="['popup-container', { 'popup-container--open': isOpen }]">
		<BookmarkPopupButton :isPopupOpen="isOpen" :count="images.length" @click="toggle" />

		<div class="popup-container__body">
			<h1 class="popup-container__body__title">Bookmarked Images</h1>
			<div class="popup-container__body__bookmarks">
				<p v-if="images.length === 0">No images bookmarked</p>
				<div class="list">
					<div
						class="list__item"
						v-for="image in images"
						:key="image.id"
						:style="{ backgroundImage: `url(${image.download_url})` }"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BookmarkPopupButton from "./BookmarkPopupButton";

export default {
	name: "BookmarkPopup",
	components: {
		BookmarkPopupButton
	},
	props: {
		images: {
			type: Array,
			default: () => []
		}
	},
	data: function() {
		return {
			isOpen: false
		};
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
		}
	}
};
</script>

<style lang="scss" scoped>
$button-size: 3rem;

.popup-container {
	$popup-container: &;

	position: relative;

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
