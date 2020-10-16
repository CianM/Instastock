/**
 * Create file name for downloaded images.
 * @function
 * @param {Object} param0
 * @param {string} param0.extension File extension
 * @param {string} param0.imageId Local ID of the image
 * @returns {string} File name
 */
export const formatFileName = ({ extension, imageId }: FormatFileNameParams): string => {
	return `Instastock - ${imageId}${extension}`;
};

interface FormatFileNameParams {
	extension: string;
	imageId: string;
}
