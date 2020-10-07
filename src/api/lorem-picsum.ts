// Image page size
const LIMIT = 50;

import { InstastockImage, StockImageService } from "../interfaces";

import { createThumbnail } from "../utils";

export class LoremPicsumService implements StockImageService {
	ID = "LOREM_PICSUM";
	NAME = "Lorem Picsum";

	/**
	 * @see {@link https://picsum.photos/}
	 */
	API_BASE_URL = "https://picsum.photos";

	/**
	 * Fetch and create a thumbnail for the image
	 */
	private getThumbnail = async (url: string): Promise<string> => {
		// Fetch image
		const response = await fetch(url);

		// Convert to blob
		const blob = await response.blob();

		// Create thumbnail data URL
		return createThumbnail(blob);
	};

	/**
	 * Convert `LoremPicsumImage` to `InstastockImage`.
	 */
	private formatImages = async (images: LoremPicsumImage[] = []): Promise<InstastockImage[]> => {
		return Promise.all(
			images.map(async image => {
				return {
					...image,
					thumbnail: await this.getThumbnail(image.download_url)
				};
			})
		);
	};

	/**
	 * Fetch `LIMIT` images from Lorem Picsum
	 */
	fetchImages = async (): Promise<InstastockImage[]> => {
		const response = await fetch(`${this.API_BASE_URL}/v2/list?limit=${LIMIT}`);

		const images: LoremPicsumImage[] = await response.json();

		return this.formatImages(images);
	};
}

export interface LoremPicsumImage {
	author: string;
	download_url: string;
	height: number;
	id: string;
	url: string;
	width: number;
}
