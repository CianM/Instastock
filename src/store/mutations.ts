import { MutationTree } from "vuex";

import { AppState } from "./state";

import { InstastockImage } from "@/interfaces";

export enum MutationTypes {
	SET_IMAGES = "Set image data in store",
	SET_THUMBNAIL = "Set thumbnail for image",
	TOGGLE_BOOKMARK = "Toggle the current image bookmark state",
	SET_ACTIVE_IMAGE_ID = "Set the ID for the active image"
}

export const mutations: MutationTree<AppState> = {
	[MutationTypes.SET_IMAGES]: function(state: AppState, images: InstastockImage[] = []) {
		// Save images in normalised state
		state.images.allIds = images.map(image => image.id);
		state.images.byId = images.reduce((acc, image) => ({ ...acc, [image.id]: image }), {});
	},
	[MutationTypes.SET_THUMBNAIL]: function(state: AppState, { id, thumbnail }) {
		state.images.thumbnails[id] = thumbnail;
	},
	[MutationTypes.TOGGLE_BOOKMARK]: function(state: AppState, id: string) {
		// Has image already been saved?
		const isSaved = state.bookmarkedImageIds.includes(id);

		// Toggle image saved state
		state.bookmarkedImageIds = isSaved
			? state.bookmarkedImageIds.filter(savedId => savedId !== id)
			: [...state.bookmarkedImageIds, id];
	},
	[MutationTypes.SET_ACTIVE_IMAGE_ID]: function(state: AppState, id: string) {
		state.activeImageId = id;
	}
};
