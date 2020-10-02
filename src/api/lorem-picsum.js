// Lorem Picsum URL
const BASE_URL = "https://picsum.photos";

// Image page size
const LIMIT = 50;

/**
 * Image fetching service for Lorem Picsum
 * @see {@link https://picsum.photos/}
 */
export async function fetchImages() {
	const response = await fetch(`${BASE_URL}/v2/list?limit=${LIMIT}`);

	const images = await response.json();

	return images;
}

/*export interface PhotoImage {
	author: string;
	download_url: string;
	height: number;
	id: string;
	url: string;
	width: number;
}*/

export default {
	fetchImages
};
