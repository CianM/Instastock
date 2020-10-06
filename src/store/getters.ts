import { InstastockImage } from "@/interfaces";
import { GetterTree } from "vuex";

import { AppState } from "./state";

export enum GetterTypes {
	IMAGES = "Get a list of all images",
	BOOKMARKED_IDS = "Get a list of all the bookmarked image IDs",
	BOOKMARKED_IMAGES = "Get a list of all bookmarked images",
	ACTIVE_IMAGE = "Get the active image data"
}

export const getters: GetterTree<AppState, AppState> = {
	[GetterTypes.IMAGES]: function(state: AppState) {
		return state.images.allIds.map(id => state.images.byId[id]);
	},
	[GetterTypes.BOOKMARKED_IDS]: function(state: AppState) {
		return state.bookmarkedImageIds;
	},
	[GetterTypes.BOOKMARKED_IMAGES]: function(state: AppState, getters) {
		return getters[GetterTypes.IMAGES].filter((image: InstastockImage) =>
			state.bookmarkedImageIds.includes(image.id)
		);
	},
	[GetterTypes.ACTIVE_IMAGE]: function(state: AppState) {
		return state.images.byId[state.activeImageId as string] || {};
	}
};
