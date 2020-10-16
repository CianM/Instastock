import { saveAs } from "file-saver";

export const downloadFile = async (file: File) => {
	// Save from blob to prevent opening in new tab
	saveAs(file, file.name);
};
