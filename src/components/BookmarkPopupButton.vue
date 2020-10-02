<template>
	<button
		:class="[
			'toggle-button',
			{
				'toggle-button--open-popup': !isPopupOpen,
				'toggle-button--close-popup': isPopupOpen,
				'toggle-button--count': count > 0
			}
		]"
		@click="handleClick"
		:data-count="count"
	>
		<img v-if="isPopupOpen" key="open" class="toggle-button__icon" src="../assets/images/close.svg" />
		<img v-else key="close" class="toggle-button__icon" src="../assets/images/bookmark.svg" />
	</button>
</template>

<script>
export default {
	name: "BookmarkPopupButton",
	props: {
		isPopupOpen: {
			type: Boolean,
			default: false
		},
		count: {
			type: Number,
			default: 0
		}
	},
	methods: {
		handleClick: function() {
			this.$emit("click");
		}
	}
};
</script>

<style lang="scss" scoped>
$button-size: 3rem;

.toggle-button {
	$toggle-button: &;

	height: $button-size;
	width: $button-size;
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	background-color: $color-alabaster;
	border-radius: 50%;
	border: none;
	padding: 0.65rem;
	cursor: pointer;
	z-index: 10;
	outline: none; // TODO: remove

	&::after {
		opacity: 0;
		content: attr(data-count);
		position: absolute;
		bottom: -0.25rem;
		right: -0.25rem;
		color: $color-alabaster;
		font-family: $font-family-sansita-swashed;
		font-weight: bold;
		line-height: 0.75rem;
		background-color: $color-mandy;
		height: 1rem;
		min-width: 1rem;
		padding: 0.25rem;
		border-radius: 50%;
		transition: opacity 0.25s, filter 0.25s;
	}

	&--open-popup {
		filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));

		&#{$toggle-button}--count::after {
			opacity: 1;
		}
	}

	&__icon {
		height: 100%;
		width: 100%;
	}
}
</style>
