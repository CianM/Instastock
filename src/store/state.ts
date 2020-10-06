import { InstastockImage } from "../interfaces";

export interface AppState {
	images: {
		allIds: string[];
		byId: { [id: string]: InstastockImage };
	};
	activeImageId: string | null;
	bookmarkedImageIds: string[];
}

export const state: AppState = {
	images: {
		allIds: [],
		byId: {}
	},
	activeImageId: null,
	bookmarkedImageIds: []
};
