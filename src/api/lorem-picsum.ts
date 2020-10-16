// Image page size
const LIMIT = 50;

import { InfoItem, InstastockImage, StockImageService } from "@/interfaces";
import { createThumbnail, formatId } from "@/utils";

export class LoremPicsumService implements StockImageService {
	readonly ID = "LOREM_PICSUM";
	readonly NAME = "Lorem Picsum";

	/**
	 * @see {@link https://picsum.photos/}
	 */
	readonly API_BASE_URL = "https://picsum.photos";

	readonly IMAGE_DETAILS_CONFIG: InfoItem[] = [
		{ label: "ID", value: (image: InstastockImage) => image.id },
		{ label: "Height", value: (image: InstastockImage) => image.size.height },
		{ label: "Width", value: (image: InstastockImage) => image.size.width },
		{ label: "Author", value: (image: InstastockImage) => image.original.author as string },
		{ label: "Source", value: (image: InstastockImage) => image.original.url as string, type: "link" }
	];

	/**
	 * Convert `LoremPicsumImage` to `InstastockImage`.
	 */
	private formatImages = (images: LoremPicsumImage[] = []): InstastockImage[] => {
		const formattedImages: InstastockImage[] = images.map(image => {
			return {
				id: formatId({ sourceId: this.ID, imageId: image.id }),
				source: this.ID,
				url: image.download_url,
				size: {
					height: image.height,
					width: image.width
				},
				original: {
					...image // Save original source data
				}
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
