import { LoremPicsumService } from "../api/lorem-picsum";

export interface InstastockImage {
	author: string;
	download_url: string;
	height: number;
	id: string;
	url: string;
	width: number;
	source: LoremPicsumService["ID"];
}

export interface StockImageService {
	readonly ID: string; // Unique ID to identify images from this service
	readonly NAME: string; // Service display name

	readonly API_BASE_URL: string;

	fetchImages(): Promise<InstastockImage[]>;

	createThumbnail(url: string): Promise<string>;
}

export interface ThumbnailResponse {
	id: string; // Image ID
	thumbnail: string; // Thumbnail data URL
}
