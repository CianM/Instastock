import Vue from "vue";
import Vuex from "vuex";

import loremPicsumApi from "../api/lorem-picsum";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export const MUTATION_TYPES = {
	SET_IMAGES: "Set image data in store",
	TOGGLE_BOOKMARK: "Toggle the current image bookmark state",
	SET_ACTIVE_IMAGE_ID: "Set the ID for the active image"
};

export const ACTION_TYPES = {
	FETCH_IMAGES: "Fetch images from API"
};

export const GETTER_TYPES = {
	IMAGES: "Get a list of all images",
	BOOKMARKED_IDS: "Get a list of all the bookmarked image IDs",
	BOOKMARKED_IMAGES: "Get a list of all bookmarked images",
	ACTIVE_IMAGE: "Get the active image data"
};

const state = {
	images: {
		allIds: [],
		byId: {}
	},
	activeImageId: null,
	bookmarkedImageIds: []
};

const getters = {
	[GETTER_TYPES.IMAGES]: function(state) {
		return state.images.allIds.map(id => state.images.byId[id]);
	},
	[GETTER_TYPES.BOOKMARKED_IDS]: function(state) {
		return state.bookmarkedImageIds;
	},
	[GETTER_TYPES.BOOKMARKED_IMAGES]: function(state, getters) {
		return getters[GETTER_TYPES.IMAGES].filter(image => state.bookmarkedImageIds.includes(image.id));
	},
	[GETTER_TYPES.ACTIVE_IMAGE]: function(state) {
		return state.images.byId[state.activeImageId] || {};
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
	},
	[MUTATION_TYPES.SET_ACTIVE_IMAGE_ID]: function(state, id) {
		state.activeImageId = id;
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
