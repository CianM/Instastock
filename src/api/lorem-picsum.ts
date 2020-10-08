// Image page size
const LIMIT = 50;

import { InstastockImage, StockImageService, ThumbnailResponse } from "../interfaces";

import { createThumbnail } from "../utils";

export class LoremPicsumService implements StockImageService {
	ID = "LOREM_PICSUM";
	NAME = "Lorem Picsum";

	/**
	 * @see {@link https://picsum.photos/}
	 */
	API_BASE_URL = "https://picsum.photos";

	/**
	 * Convert `LoremPicsumImage` to `InstastockImage`.
	 */
	private formatImages = (images: LoremPicsumImage[] = []): InstastockImage[] => {
		const formattedImages: InstastockImage[] = images.map(image => {
			return {
				...image,
				source: this.ID
			};
		});

		return formattedImages;
	};

	/**
	 * Fetch `LIMIT` images from Lorem Picsum
	 */
	fetchImages = async (): Promise<InstastockImage[]> => {
		const response = await fetch(`${this.API_BASE_URL}/v2/list?limit=${LIMIT}`);

		const images: LoremPicsumImage[] = await response.json();

		return this.formatImages(images);
	};

	createThumbnail = async (url: string): Promise<string> => {
		// Fetch image
		const response = await fetch(url);

		// Convert to blob
		const blob = await response.blob();

		// Create thumbnail data URL
		return createThumbnail(blob);
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
