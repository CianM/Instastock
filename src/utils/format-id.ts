/**
 * Create globally unique ID for images
 * @function
 * @param {Object} param0
 * @param {string} param0.sourceId ID of image source website
 * @param {string} param0.imageId Local ID of the image
 * @returns {string} Formatted globally unique ID
 */
export const formatId = ({ sourceId, imageId }: { sourceId: string; imageId: string }): string => {
	return `${sourceId}:${imageId}`;
};
