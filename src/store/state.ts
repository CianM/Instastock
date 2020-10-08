import { InstastockImage } from "../interfaces";

export interface AppState {
	images: {
		allIds: string[];
		byId: { [id: string]: InstastockImage };
		thumbnails: { [id: string]: string };
	};
	activeImageId: string | null;
	bookmarkedImageIds: string[];
}

export const state: AppState = {
	images: {
		allIds: [],
		byId: {},
		thumbnails: {}
	},
	activeImageId: null,
	bookmarkedImageIds: []
};
