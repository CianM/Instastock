import { ActionTree } from "vuex";

import { MutationTypes } from "./mutations";
import { AppState } from "./state";

import loremPicsumApi from "../api/lorem-picsum";

export enum ActionTypes {
	FETCH_IMAGES = "Fetch images from API"
}

export const actions: ActionTree<AppState, AppState> = {
	[ActionTypes.FETCH_IMAGES]: async function({ commit }) {
		const images = await loremPicsumApi.fetchImages();

		commit(MutationTypes.SET_IMAGES, images);
	}
};
