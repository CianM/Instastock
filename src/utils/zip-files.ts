import JSZip from "jszip";

export const zipFiles = async ({ files = [] }: { files: File[] }) => {
	// Create new zip instance
	const zip = new JSZip();

	// Create folder for downloaded images
	const zipFolder = zip.folder("instastock") as JSZip;

	// Add all files to folder
	files.forEach(file => zipFolder.file<"blob">(file.name, file));

	const zipBlob = await zipFolder.generateAsync({ type: "blob" });

	return new File([zipBlob], "instastock.zip", { type: zipBlob.type });
};
