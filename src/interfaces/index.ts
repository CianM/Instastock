export interface InstastockImage {
	author: string;
	download_url: string;
	height: number;
	id: string;
	url: string;
	width: number;
	thumbnail: string;
}

export interface StockImageService {
	readonly ID: string; // Unique ID to identify images from this service
	readonly NAME: string; // Service display name

	readonly API_BASE_URL: string;

	fetchImages(): Promise<InstastockImage[]>;
}
