import { Source } from "@/api";

export interface InstastockImage {
	id: string; // Unique ID across all images
	source: Source; // Image source site
	url: string;
	size: {
		height: number;
		width: number;
	};
	original: {
		[key: string]: unknown;
	};
}

export interface StockImageService {
	readonly ID: string; // Unique ID to identify images from this service
	readonly NAME: string; // Service display name

	readonly API_BASE_URL: string;

	readonly IMAGE_DETAILS_CONFIG: InfoItem[];

	fetchImages(): Promise<InstastockImage[]>;

	createThumbnail(url: string): Promise<string>;
}

export interface ThumbnailResponse {
	id: string; // Image ID
	thumbnail: string; // Thumbnail data URL
}

// Image detail view info item
export interface InfoItem {
	label: string; // Data label
	value: (image: InstastockImage) => string | number; // Data value function
	type?: string;
}
