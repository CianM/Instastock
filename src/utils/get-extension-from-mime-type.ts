export const getExtensionFromMimeType = (mimeType: string): string => {
	switch (mimeType) {
		case "image/jpeg":
			return ".jpg";
		default: {
			console.error(`Extension not found for mime type: ${mimeType}`);
			return "";
		}
	}
};
