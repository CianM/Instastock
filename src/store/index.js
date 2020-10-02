import Vue from "vue";
import Vuex from "vuex";

import loremPicsumApi from "../api/lorem-picsum";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export const MUTATION_TYPES = {
	SET_IMAGES: "Set image data in store",
	TOGGLE_BOOKMARK: "Toggle the current image bookmark state"
};

export const ACTION_TYPES = {
	FETCH_IMAGES: "Fetch images from API"
};

const state = {
	images: {
		allIds: [],
		byId: {}
	},
	bookmarkedImageIds: []
};

const getters = {
	images: function(state) {
		return state.images.allIds.map(id => state.images.byId[id]);
	},
	bookmarkedImages: function(state, getters) {
		return getters.images.filter(image => state.bookmarkedImageIds.includes(image.id));
	}
};

const mutations = {
	[MUTATION_TYPES.SET_IMAGES]: function(state, images = []) {
		state.images = {
			allIds: images.map(image => image.id),
			byId: images.reduce((acc, image) => ({ ...acc, [image.id]: image }), {})
		};
	},
	[MUTATION_TYPES.TOGGLE_BOOKMARK]: function(state, id) {
		// Has image already been saved?
		const isSaved = state.bookmarkedImageIds.includes(id);

		// Toggle image saved state
		state.bookmarkedImageIds = isSaved
			? state.bookmarkedImageIds.filter(savedId => savedId !== id)
			: [...state.bookmarkedImageIds, id];
	}
};

const actions = {
	[ACTION_TYPES.FETCH_IMAGES]: function({ commit }) {
		loremPicsumApi.fetchImages().then(images => commit(MUTATION_TYPES.SET_IMAGES, images));
	}
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug
});
