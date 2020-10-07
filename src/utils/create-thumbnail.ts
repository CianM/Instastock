/**
 * Use promises to convert blob to data URL using `FileReader`.
 */
const readAsDataURL = (file: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		// Return `FileReader` result when loaded
		reader.onerror = reject;
		reader.onload = () => resolve(reader.result as string);

		reader.readAsDataURL(file);
	});

/**
 * Use promises to wait for image load event.
 */
const loadImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		// Create new image
		const image = new Image();

		// Resolve promise when image loads
		image.onload = () => resolve(image);
		image.onerror = reject;

		image.src = url;
	});

/**
 * Create thumbnail from image.
 * Default scale is 1/10th size of original image.
 */
export const createThumbnail = async (image: Blob, scale: number = 0.1): Promise<string> => {
	// Image data URL
	const imageDownloadUrl = await readAsDataURL(image);

	// Set URL as image source
	const tempImage = await loadImage(imageDownloadUrl);

	// Get original image size
	const originalWidth = tempImage.width;
	const originalHeight = tempImage.height;

	// Calculate thumbnail size
	const newWidth = originalWidth * scale;
	const newHeight = originalHeight * scale;

	// Create a temporary canvas to draw the downscaled image on
	const canvas = document.createElement("canvas");
	canvas.width = newWidth;
	canvas.height = newHeight;

	// Draw the downscaled image on the canvas and return the new data URL.
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	ctx.drawImage(tempImage, 0, 0, newWidth, newHeight);

	const thumbnailDataUrl = canvas.toDataURL();

	return thumbnailDataUrl;
};
