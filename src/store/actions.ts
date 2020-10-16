import { ActionTree } from "vuex";

import { MutationTypes } from "./mutations";
import { AppState } from "./state";

import { loremPicsumService } from "@/api";

export enum ActionTypes {
	FETCH_IMAGES = "Fetch images from API"
}

export const actions: ActionTree<AppState, AppState> = {
	[ActionTypes.FETCH_IMAGES]: async function({ commit }) {
		// Fetch images
		const images = await loremPicsumService.fetchImages();

		// Save images
		commit(MutationTypes.SET_IMAGES, images);

		// Create thumbnails for images
		// TODO: Make API calls independent of one another
		images.forEach(async image => {
			const thumbnail = await loremPicsumService.createThumbnail(image.url);

			commit(MutationTypes.SET_THUMBNAIL, { id: image.id, thumbnail });
		});
	}
};
