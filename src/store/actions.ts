import { ActionTree } from "vuex";

import { MutationTypes } from "./mutations";
import { AppState } from "./state";

import { loremPicsumService } from "../api";

export enum ActionTypes {
	FETCH_IMAGES = "Fetch images from API"
}

export const actions: ActionTree<AppState, AppState> = {
	[ActionTypes.FETCH_IMAGES]: async function({ commit }) {
		const images = await loremPicsumService.fetchImages();

		commit(MutationTypes.SET_IMAGES, images);
	}
};
