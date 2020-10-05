<template>
	<svg
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 122.88 107.41"
		style="enable-background:new 0 0 122.88 107.41"
		xml:space="preserve"
		:class="[
			'heart-indicator',
			{ 'heart-indicator--shadow': shadow, 'heart-indicator--border': border && !active }
		]"
		@click="clickHandler"
	>
		<g>
			<path
				:class="['heart-indicator__heart', { 'heart-indicator__heart--active': active }]"
				d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95 C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z"
			/>
		</g>
	</svg>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
			default: false
		},
		shadow: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		clickHandler: function() {
			this.$emit("heart-clicked");
		}
	}
};
</script>

<style scoped lang="scss">
.heart-indicator {
	$heart-indicator: &;

	height: 100%;
	width: 100%;
	transition: transform 0.5s;

	&__heart {
		position: relative;
		fill: $color-alabaster;
		height: 100%;
		width: 100%;
		transition: fill 0.5s;

		&--active {
			fill: $color-mandy;
		}
	}

	&--shadow {
		filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
	}

	&--border {
		transform: scale(0.75);

		#{$heart-indicator}__heart {
			fill: rgba($color-outer-space, 0.25);
		}
	}
}
</style>
